import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProjectQueryKey = "projects";
type Project = {
  created_at: string;
  created_by: string;
  id: string;
  name: string;
};

export const useProjects = () => {
  const { data: projects, refetch } = useQuery({
    queryKey: [ProjectQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
  });

  useEffect(() => {
    const subscription = supabase
      .channel("projects")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "projects" },
        (payload) => {
          console.log("Change received!", payload);
          refetch();
        }
      )
      .subscribe();

    console.log("Subscribed to todos channel");
    return () => {
      console.log("Unsubscribing from todos channel");
      void subscription.unsubscribe();
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
        .insert({ created_by: user.data.user?.id, name: name })
        .select("*");

      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
    onMutate: async () => {
      console.log("Creating new project...");
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
        name: "New Project",
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
      } satisfies Project;
      queryClient.setQueryData<Project[]>([ProjectQueryKey], (oldProjects) => [
        ...(oldProjects || []),
        newProject,
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

  const deleteProject = async (id: string) => {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .select("*");
    if (error) {
      throw new Error("Network response was not ok", error);
    }
    return data;
  };

  return { projects, createNewProject, deleteProject };
};
