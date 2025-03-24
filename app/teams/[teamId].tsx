import { NewTeamMemberDialog } from "@/components/Lib/CreationDialog/NewTeamMemberDialog";
import { useTeam } from "@/hooks/useTeam";
import { useLocalSearchParams } from "expo-router";
import { Button, Dialog, H1, H2, ListItem, ScrollView, Stack } from "tamagui";

export default function Team() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const { teamMembers, handleTeamMemberCreate } = useTeam(teamId)

  return (
    <Dialog modal>
      <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
        <H1>Teams</H1>
        <H2>Team Members</H2>
        <ScrollView>
          {teamMembers?.map((teamMember) => (
            <ListItem key={teamMember.profiles.id} title={teamMember.profiles.email}></ListItem>
          ))}
        </ScrollView>
        <Dialog.Trigger asChild>
          <Button size="$3" marginTop="$4">
            Invite member
          </Button>
        </Dialog.Trigger>
      </Stack>
      <NewTeamMemberDialog
        onSubmit={handleTeamMemberCreate}
      />
    </Dialog>
  );
};
