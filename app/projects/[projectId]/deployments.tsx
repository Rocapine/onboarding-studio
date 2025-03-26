import { Link, useLocalSearchParams } from "expo-router";
import { Button, H1, H2, Stack, Text, XStack, YStack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
import { useState } from "react";

export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);
  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-onboarding-steps?projectId=${projectId}&environment=production`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.name}</H1>
      <YStack gap="$2">
        <H2>Deployments</H2>
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          <Link href={url} target="_blank">
            <Text
              color="$blue10"
              numberOfLines={1}
              width={300}
              display="block"
              textOverflow="ellipsis"
            >
              {url}
            </Text>
          </Link>
          <Button
            size="$3"
            onPress={handleCopy}
            backgroundColor={copied ? "$green8" : "$blue8"}
            color="white"
          >
            {copied ? "Copied!" : "Copy URL"}
          </Button>
        </XStack>
      </YStack>
    </Stack>
  </Stack>
}
