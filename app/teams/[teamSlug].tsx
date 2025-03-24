import { NewTeamMemberDialog } from "@/components/Lib/CreationDialog/NewTeamMemberDialog";
import { useState } from "react";
import { Button, Dialog, H1, H2, ListItem, ScrollView, Stack } from "tamagui";

const initialTeamMembers = [
  { id: "kdfjslkfjsdlkffskjls", email: "hildegarde@croute.lol" },
  { id: "qdskljqdflkqsjldkqjqsld", email: "philipe@croute.lol" }
]

export default function TeamSlug() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)

  const handleTeamCreate = ({ email }: { email: string }) => {
    setTeamMembers((prevTeams) => {
      return [...prevTeams, { email, id: email + "skdfjslkfjslkdj" }]
    })
  }


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
        onSubmit={handleTeamCreate}
      />
    </Dialog>
  );
};
