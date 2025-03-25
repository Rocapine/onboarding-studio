import { NewTeamMemberDialog } from "@/components/Lib/CreationDialog/NewTeamMemberDialog";
import { useTeam } from "@/hooks/useTeam";
import { useLocalSearchParams } from "expo-router";
import { Button, Dialog, H1, H2, ScrollView, Stack, XStack, YStack, Card, Text } from "tamagui";

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
            <Card
              key={teamMember.profiles.id}
              elevate
              bordered
              padding="$4"
              marginVertical="$2"
            >
              <XStack alignItems="center" justifyContent="space-between">
                <YStack>
                  <Text fontSize="$6" fontWeight="bold">{teamMember.profiles.email}</Text>
                </YStack>
              </XStack>
            </Card>
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
