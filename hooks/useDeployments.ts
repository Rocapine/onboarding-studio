import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Project, useProjects } from "./useProjects";
import { supabase } from "../supabase.client";
import { Tables } from "@/generated/supabase";
import { useEffect } from "react";

type Deployment = Tables<"deployments">;

const queryKey = "deployments";

export const useDeployments = (projectId: Project["id"]) => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, deployments(*, created_by(*))")
        .eq("id", projectId)
        .order("created_at", {
          ascending: false,
          referencedTable: "deployments",
        })
        .single();

      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
  });

  useEffect(() => {
    const deploymentSubscription = supabase
      .channel("deployments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "deployments",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          console.log("Youpi update", payload);
          refetch();
        }
      )
      .subscribe();

    return () => {
      void deploymentSubscription.unsubscribe();
    };
  }, []);

  const { deployments, ...project } = data;

  const mutation = useMutation({
    mutationFn: async ({
      environment,
    }: {
      environment: Deployment["environment"];
    }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      const deployment = {
        created_by: user.data.user.id,
        created_at: new Date().toISOString(),
        project_id: projectId,
        environment,
        steps: project.steps,
      } satisfies Partial<Deployment>;
      const { data, error } = await supabase
        .from("deployments")
        .insert(deployment);
      if (error) {
        console.error("Error creating deployment:", error);
        throw new Error("Failed to create deployment", error);
      }
      return data;
    },
  });

  const promote = mutation.mutate;
  const baseUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-onboarding-steps?projectId=${projectId}`;
  const productionUrl = `${baseUrl}&environment=production`;
  const sandboxUrl = `${baseUrl}&environment=sandbox`;
  return { deployments, project, promote, productionUrl, sandboxUrl };
};
