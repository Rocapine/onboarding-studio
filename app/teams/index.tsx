import { NewTeamDialog } from "@/components/Lib/CreationDialog/NewTeamDialog";
import { useTeams } from "@/hooks/useTeams";
import { useRouter } from "expo-router";
import { Button, Dialog, H1, ListItem, ScrollView, Stack } from "tamagui";

export default function Teams() {
  const router = useRouter()
  const { teams, handleTeamCreate } = useTeams()

  const onTeamPress = (teamId: string) => {
    router.push(`/teams/${teamId}`)
  }

  return (
    <Dialog modal>
      <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
        <H1>Teams</H1>
        <ScrollView>
          {teams?.map((team) => (
            <ListItem onPress={() => onTeamPress(team.id)} key={team.id} title={team.name} subTitle={team.slug}>  </ListItem>
          ))}
        </ScrollView>
        <Dialog.Trigger asChild>
          <Button size="$3" marginTop="$4">
            Create New Team
          </Button>
        </Dialog.Trigger>
      </Stack>
      <NewTeamDialog
        onSubmit={handleTeamCreate}
      />
    </Dialog>
  );
};
