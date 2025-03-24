import { NewTeamMemberDialog } from "@/components/Lib/CreationDialog/NewTeamMemberDialog";
import { useTeam } from "@/hooks/useTeam";
import { Button, Dialog, H1, H2, ListItem, ScrollView, Stack } from "tamagui";


const teamId = 'teamId'

export default function TeamSlug() {
  const { teamMembers, handleTeamMemberCreate } = useTeam(teamId)

  return (
    <Dialog modal>
      <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
        <H1>Teams</H1>
        <H2>Team Members</H2>
        <ScrollView>
          {teamMembers?.map((team) => (
            <ListItem key={team.id} title={team.email}></ListItem>
          ))}
        </ScrollView>
        <Dialog.Trigger asChild>
          <Button size="$3" marginTop="$4">
            Create New Team
          </Button>
        </Dialog.Trigger>
      </Stack>
      <NewTeamMemberDialog
        onSubmit={handleTeamMemberCreate}
      />
    </Dialog>
  );
};
