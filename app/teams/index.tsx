import { NewTeamDialog } from "@/components/Lib/CreationDialog/NewTeamDialog";
import { useTeams } from "@/hooks/useTeams";
import { useRouter } from "expo-router";
import { Button, Dialog, H1, ScrollView, Stack, XStack, YStack, Card, Text } from "tamagui";

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
            <Card
              key={team.id}
              elevate
              bordered
              padding="$4"
              marginVertical="$2"
              onPress={() => onTeamPress(team.id)}
            >
              <XStack alignItems="center" justifyContent="space-between">
                <YStack>
                  <Text fontSize="$6" fontWeight="bold">{team.name}</Text>
                  <Text color="$gray11">{team.slug}</Text>
                </YStack>
              </XStack>
            </Card>
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
