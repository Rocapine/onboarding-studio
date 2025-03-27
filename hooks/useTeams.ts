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

        // Create or update user profile
        supabase
          .from("profiles")
          .upsert({
            id: user.data.user.id,
            email: user.data.user.email,
          })
          .select()
          .single()
          .then(({ error }) => {
            if (error) {
              console.error("Error creating profile:", error);
            }
          });

        const defaultTeamName = `${capitalizeFirstLetter(username)}'s Team`;
        const defaultTeamSlug = generateSlug(defaultTeamName);
        const { data: defaultTeam, error: defaultTeamError } = await supabase
          .from("teams")
          .upsert([
            {
              name: defaultTeamName,
              slug: defaultTeamSlug,
            },
          ])
          .select("*")
          .single();

        if (defaultTeamError) {
          console.error("Error creating default team:", defaultTeamError);
          throw new Error("Failed to create default team", defaultTeamError);
        }
        await supabase.from("team_memberships").insert([
          {
            user_id: user.data.user.id,
            team_id: defaultTeam.id,
          },
        ]);

        return [defaultTeam];
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
      const { error: memberShipError } = await supabase
        .from("team_memberships")
        .insert([
          {
            user_id: data?.[0].created_by,
            team_id: data?.[0].id,
          },
        ]);
      if (memberShipError) {
        console.error("Error creating team membership:", memberShipError);
        throw new Error("Failed to create team membership", memberShipError);
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
      const newTeam = {
        id: Date.now().toString(),
        name: name,
        slug: slug,
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
      } satisfies Team;
      queryClient.setQueryData<Team[]>([teamsQueryKey], (oldProjects) => [
        ...(oldProjects || []),
        newTeam,
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
