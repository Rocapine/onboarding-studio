import { initialSteps } from "@/contexts/steps-context";
import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Tables } from "../generated/supabase";

const queryKey = "projects";
export type Project = Tables<"projects">;

export const useProjects = () => {
  const { data: projects, refetch } = useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, teams(*)")
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
    mutationFn: async ({ name, teamId }: { name: string; teamId: string }) => {
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
          team_id: teamId,
        })
        .select("*");

      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
    onMutate: async ({ name, teamId }: { name: string; teamId: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const previousProjects = queryClient.getQueryData<Project[]>([queryKey]);
      const newProject = {
        id: Date.now().toString(),
        name: name,
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
        team_id: teamId,
        steps: [],
      } satisfies Project;
      queryClient.setQueryData<Project[]>([queryKey], (oldProjects) => [
        newProject,
        ...(oldProjects || []),
      ]);
      return { previousProjects };
    },
    onError: (err, newTodo, context) => {
      console.error("Error creating new project:", err);
      queryClient.setQueryData([queryKey], context?.previousProjects);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
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
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const previousProjects = queryClient.getQueryData<Project[]>([queryKey]);
      const previousProjectWithoutDeletedProject = previousProjects?.filter(
        (project) => project.id !== id
      );
      queryClient.setQueryData<Project[]>(
        [queryKey],
        previousProjectWithoutDeletedProject
      );
      return { previousProjects };
    },
    onError: (err, projectId, context) => {
      console.error("Error deleting new project:", err);
      queryClient.setQueryData([queryKey], context?.previousProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { projects, createNewProject, deleteProject };
};
