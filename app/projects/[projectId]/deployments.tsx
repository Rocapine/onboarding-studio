import { Link, useLocalSearchParams } from "expo-router";
import { Button, H1, H2, H3, Paragraph, Stack, XStack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);
  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-onboarding-steps?projectId=${projectId}&environment=production`

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.name}</H1>
      <XStack gap={'$2'} alignItems="baseline">
        <H2>Deployments</H2>
        <Link href={url} target="_blank">
          <Paragraph>{url}</Paragraph>
        </Link>
        <Button
          onPress={() => {
            navigator.clipboard.writeText(url);
          }}
        >
          Copy URL
        </Button>
      </XStack>
    </Stack>
  </Stack>
}
