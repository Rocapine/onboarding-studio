import type { Tables } from "@/generated/supabase";
import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { useMutation, useQuery } from "@tanstack/react-query";

type TeamMember = Tables<"team_memberships">;

const queryKey = "team_members";

export const useTeam = (teamId: string) => {
  const { data: teamMembers } = useQuery({
    queryKey: [queryKey, teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_memberships")
        .select("*, profiles(*)")
        .eq("team_id", teamId);
      if (!data) {
        console.error("Error fetching team members:", error);
        throw new Error("Failed to fetch team members", error);
      }
      if (data.length === 0) {
        console.warn("No team found");
        return [];
      }

      return data;
    },
  });

  const createTeamMemberMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data: existingUser, error: existingUserError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();
      if (!existingUser) {
        console.error("User not found:", existingUserError);
        throw new Error("User not found", existingUserError);
      }
      const { data, error } = await supabase
        .from("team_memberships")
        .insert([{ user_id: existingUser?.id, team_id: teamId }])
        .select("*");
      if (error) {
        console.error("Error creating team member:", error);
        throw new Error("Failed to create team member", error);
      }
      return data;
    },
    onMutate: async ({ email }: { email: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: [queryKey, teamId] });
      const previousTeamMembers = queryClient.getQueryData<TeamMember[]>([
        queryKey,
        teamId,
      ]);
      const newTeamMember = {
        user_id: email,
        team_id: teamId,
        created_at: new Date().toISOString(),
        profiles: {
          id: email,
          email: email,
        },
      };
      queryClient.setQueryData<TeamMember[]>(
        [queryKey, teamId],
        (oldTeamMembers) => [newTeamMember, ...(oldTeamMembers || [])]
      );
      return { previousTeamMembers };
    },
    onError: (err, _, context) => {
      console.error("Error creating new team member:", err);
      queryClient.setQueryData(
        [queryKey, teamId],
        context?.previousTeamMembers
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, teamId] });
    },
  });
  const handleTeamMemberCreate = createTeamMemberMutation.mutate;

  return { teamMembers, handleTeamMemberCreate };
};
