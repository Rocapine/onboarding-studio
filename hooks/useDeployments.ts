import { useSuspenseQuery } from "@tanstack/react-query";
import { Project } from "./useProjects";
import { supabase } from "../supabase.client";

const queryKey = "deployments";
export const useDeployments = (projectId: Project["id"]) => {
  const query = useSuspenseQuery({
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
  return query;
};
