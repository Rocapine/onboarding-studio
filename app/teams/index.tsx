import { NewTeamDialog } from "@/components/Lib/CreationDialog/NewTeamDialog";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Dialog, H1, ListItem, ScrollView, Stack } from "tamagui";

const initialTeams = [
  {
    name: "Sammy's team",
    id: "cskldjfskljflskjflskd",
    slug: "sammy"
  },
  {
    name: "Rocapine",
    id: "dkjfslkfjskjslkdfjsdfs",
    slug: "rocapine"
  }
]

export default function Teams() {
  const [teams, setTeams] = useState(initialTeams)
  const router = useRouter()

  const handleTeamCreate = ({ teamName, teamSlug }: { teamName: string, teamSlug: string }) => {
    setTeams((prevTeams) => {
      return [...prevTeams, { name: teamName, slug: teamSlug, id: teamSlug + "skdfjslkfjslkdj" }]
    })
  }

  const onTeamPress = (teamId: string) => {
    router.push(`/teams/${teamId}`)
  }

  return (
    <Dialog modal>
      <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
        <H1>Teams</H1>
        <ScrollView>
          {teams?.map((team) => (
            <ListItem onPress={() => onTeamPress(team.slug)} key={team.id} title={team.name} subTitle={team.slug}>  </ListItem>
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
