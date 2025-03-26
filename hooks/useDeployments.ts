import { useSuspenseQuery } from "@tanstack/react-query";
import { Project } from "./useProjects";
import { supabase } from "../supabase.client";
import { Tables } from "@/generated/supabase";

type Deployment = Tables<"deployments">;

const queryKey = "deployments";

export const useDeployments = (projectId: Project["id"]) => {
  const { data } = useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, deployments(*)")
        .eq("id", projectId)
        .single();

      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
  });

  const { deployments, ...project } = data;

  const promote = async (environment: Deployment["environment"]) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error("User not authenticated");
    }
    const deployment = {
      created_by: user.data.user.id,
      created_at: new Date().toISOString(),
      project_id: projectId,
      environment,
    } satisfies Partial<Deployment>;
    console.log("promoting to", deployment);
  };
  return { deployments, project, promote };
};
