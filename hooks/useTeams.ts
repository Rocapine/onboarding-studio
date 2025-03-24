import type { Tables } from "@/generated/supabase";
import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { capitalizeFirstLetter, generateSlug } from "@/utils/string.utils";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

const teamsQueryKey = "teams";

export type Team = Tables<"teams">;

export const useTeams = () => {
  const { data: teams } = useSuspenseQuery({
    queryKey: [teamsQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from("teams").select("*");
      if (!data) {
        console.error("Error fetching teams:", error);
        throw new Error("Failed to fetch teams", error);
      }
      if (data.length === 0) {
        console.warn("No teams found, creating default team");
        const user = await supabase.auth.getUser();
        const username = user?.data?.user?.email?.split("@")[0];
        if (!username || !user.data.user) {
          throw new Error("User not authenticated");
        }
        const defaultTeamName = `${capitalizeFirstLetter(username)}'s Team`;
        const defaultTeamSlug = generateSlug(defaultTeamName);
        console.log({
          defaultTeamName,
          defaultTeamSlug,
        });
        const { data: defaultTeam, error: defaultTeamError } = await supabase
          .from("teams")
          .insert([
            {
              name: defaultTeamName,
              slug: defaultTeamSlug,
            },
          ])
          .select("*");
        if (defaultTeamError) {
          console.error("Error creating default team:", defaultTeamError);
          throw new Error("Failed to create default team", defaultTeamError);
        }
        return defaultTeam;
      }

      return data;
    },
  });

  const createTeamMutation = useMutation({
    mutationFn: async ({ name, slug }: { name: string; slug: string }) => {
      const { data, error } = await supabase
        .from("teams")
        .insert([{ name, slug }])
        .select("*");

      if (error) {
        console.error("Error creating team:", error);
        throw new Error("Failed to create team", error);
      }
      return data;
    },
    onMutate: async ({ name, slug }: { name: string; slug: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: [teamsQueryKey] });
      const previousTeams = queryClient.getQueryData<Team[]>([teamsQueryKey]);
      const newProject = {
        id: Date.now().toString(),
        name: name,
        slug: slug,
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
      } satisfies Team;
      queryClient.setQueryData<Team[]>([teamsQueryKey], (oldProjects) => [
        newProject,
        ...(oldProjects || []),
      ]);
      return { previousProjects: previousTeams };
    },
    onError: (err, _, context) => {
      console.error("Error creating new project:", err);
      queryClient.setQueryData([teamsQueryKey], context?.previousProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [teamsQueryKey] });
    },
  });

  const handleTeamCreate = createTeamMutation.mutate;

  return { teams, handleTeamCreate };
};
