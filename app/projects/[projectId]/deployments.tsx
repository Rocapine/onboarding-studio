import { useLocalSearchParams } from "expo-router";
import { Button, H1, H2, H3, Paragraph, Stack, XStack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);
  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/V1/get-onboarding-steps?projectId=${projectId}&environment=production`

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.name}</H1>
      <H2>Deployments</H2>
      <XStack>
        <Paragraph>{url}</Paragraph>
        <Button
          onPress={() => {
            const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/V1/get-onboarding-steps?projectId=${projectId}&environment=production`;
            // Using the clipboard API
            navigator.clipboard.writeText(url);
          }}
        >
          Copy URL
        </Button>
      </XStack>
    </Stack>
  </Stack>
}
