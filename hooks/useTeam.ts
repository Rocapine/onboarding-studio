import type { Tables } from "@/generated/supabase";
import { queryClient } from "@/Provider";
import { supabase } from "@/supabase.client";
import { useMutation, useQuery } from "@tanstack/react-query";

type TeamMember = Tables<"team_members">;

export const useTeam = (teamId: string) => {
  const { data: teamMembers } = useQuery({
    queryKey: ["team_members", teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teamId);
      if (!data) {
        console.error("Error fetching team members:", error);
        throw new Error("Failed to fetch team members", error);
      }
      return data;
    },
  });

  const createTeamMemberMutation = useMutation({
    mutationFn: async ({ memberId }: { memberId: string }) => {
      const { data, error } = await supabase
        .from("team_members")
        .insert([{ member_id: memberId, team_id: teamId }])
        .select("*");
      if (error) {
        console.error("Error creating team member:", error);
        throw new Error("Failed to create team member", error);
      }
      return data;
    },
    onMutate: async ({ memberId }: { memberId: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      // Optimistically update the UI here if needed
      await queryClient.cancelQueries({ queryKey: ["team_members", teamId] });
      const previousTeamMembers = queryClient.getQueryData<TeamMember[]>([
        "team_members",
        teamId,
      ]);
      const newTeamMember = {
        id: Date.now().toString(),
        member_id: memberId,
        team_id: teamId,
        created_by: user.data.user?.id,
        created_at: new Date().toISOString(),
      } satisfies TeamMember;
      queryClient.setQueryData<TeamMember[]>(
        ["team_members", teamId],
        (oldTeamMembers) => [newTeamMember, ...(oldTeamMembers || [])]
      );
      return { previousTeamMembers };
    },
    onError: (err, _, context) => {
      console.error("Error creating new team member:", err);
      queryClient.setQueryData(
        ["team_members", teamId],
        context?.previousTeamMembers
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members", teamId] });
    },
  });
  const handleTeamMemberCreate = createTeamMemberMutation.mutate;

  return { teamMembers, handleTeamMemberCreate };
};
