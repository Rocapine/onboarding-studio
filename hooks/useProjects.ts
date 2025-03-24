import { initialSteps } from "@/contexts/steps-context";
import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProjectQueryKey = "projects";
type Project = {
  created_at: string;
  created_by: string;
  id: string;
  name: string;
};

export const useProjects = () => {
  const { data: projects, refetch } = useSuspenseQuery({
    queryKey: [ProjectQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", {
          ascending: false,
        });
      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
  });

  useEffect(() => {
    const insertSubscription = supabase
      .channel("projects")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "projects" },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    const deleteSubscription = supabase
      .channel("projects")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "projects" },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      void insertSubscription.unsubscribe();
      void deleteSubscription.unsubscribe();
    };
  }, []);

  const createNewProject = useMutation({
    mutationFn: async (name: string) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("projects")
        .insert({
          created_by: user.data.user?.id,
          name: name,
          steps: initialSteps,
        })
        .select("*");

      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
    onMutate: async (name: string) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: [ProjectQueryKey] });
      const previousProjects = queryClient.getQueryData<Project[]>([
        ProjectQueryKey,
      ]);
      const newProject = {
        id: Date.now().toString(),
        name: name,
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
      } satisfies Project;
      queryClient.setQueryData<Project[]>([ProjectQueryKey], (oldProjects) => [
        newProject,
        ...(oldProjects || []),
      ]);
      return { previousProjects };
    },
    onError: (err, newTodo, context) => {
      console.error("Error creating new project:", err);
      queryClient.setQueryData([ProjectQueryKey], context?.previousProjects);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProjectQueryKey] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .select("*");
      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
    onMutate: async (id: string) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: [ProjectQueryKey] });
      const previousProjects = queryClient.getQueryData<Project[]>([
        ProjectQueryKey,
      ]);
      const previousProjectWithoutDeletedProject = previousProjects?.filter(
        (project) => project.id !== id
      );
      queryClient.setQueryData<Project[]>(
        [ProjectQueryKey],
        previousProjectWithoutDeletedProject
      );
      return { previousProjects };
    },
    onError: (err, projectId, context) => {
      console.error("Error deleting new project:", err);
      queryClient.setQueryData([ProjectQueryKey], context?.previousProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProjectQueryKey] });
    },
  });

  return { projects, createNewProject, deleteProject };
};
