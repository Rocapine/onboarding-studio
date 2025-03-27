import { LoadingScreen } from "@/components/Loading";
import { useOnboardings } from "@/hooks/useOnboardings";
import { format } from "date-fns";
import { Link, useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { Button, Card, H1, ScrollView, YStack, View, XStack, Text } from "tamagui";

export default function Onboardings() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <OnboardingsPage />
    </Suspense>
  )
}

function OnboardingsPage() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { onboardings } = useOnboardings(projectId);
  console.log(onboardings);
  return <View flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
    <H1>Onboardings</H1>
    <ScrollView>
      {onboardings.map((onboarding) => (
        <Card key={onboarding.id} elevate bordered padding="$4" marginVertical="$2">
          <XStack alignItems="center" justifyContent="space-between">
            <YStack>
              <Text fontSize="$6" fontWeight="bold">{onboarding.name}</Text>
              <Text color="$gray11">
                Last edited: {format(new Date(onboarding.edited_at), 'yyyy-MM-dd, h:mm a')} •
                {onboarding.published_at
                  ? ` Last published: ${format(new Date(onboarding.published_at), 'yyyy-MM-dd, h:mm a')}`
                  : ' Never published'}
              </Text>
            </YStack>
            <XStack gap="$2">
              <Link href={`/projects/${projectId}/onboardings/${onboarding.id}/steps`}>
                <Button size="$2">Edit Steps</Button>
              </Link>
              <Button size="$2">Publish</Button>
            </XStack>
          </XStack>
        </Card>
      ))}
    </ScrollView>
  </View>
}