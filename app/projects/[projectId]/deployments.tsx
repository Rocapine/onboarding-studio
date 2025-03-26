import { Link, useLocalSearchParams } from "expo-router";
import { Button, H1, H2, Stack, Text, XStack, YStack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
import { Suspense, useState } from "react";
import { LoadingScreen } from "@/components/Loading";

export default function Deployments() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DeploymentsPage />
    </Suspense>
  );
}

function DeploymentsPage() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);
  const baseUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/get-onboarding-steps?projectId=${projectId}`;
  const productionUrl = `${baseUrl}&environment=production`;
  const sandboxUrl = `${baseUrl}&environment=sandbox`;
  const [copiedProduction, setCopiedProduction] = useState(false);
  const [copiedSandbox, setCopiedSandbox] = useState(false);

  const handleCopy = async (url: string, setCopied: (value: boolean) => void) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.name}</H1>
      <YStack gap="$4">
        <YStack gap="$2">
          <H2>Production URL</H2>
          <XStack gap="$2" alignItems="center" flexWrap="wrap">
            <Link href={productionUrl} target="_blank">
              <Text
                color="$blue10"
                numberOfLines={1}
                width={300}
                display="block"
                textOverflow="ellipsis"
              >
                {productionUrl}
              </Text>
            </Link>
            <Button
              size="$3"
              onPress={() => handleCopy(productionUrl, setCopiedProduction)}
              backgroundColor={copiedProduction ? "$green8" : "$blue8"}
              color="white"
            >
              {copiedProduction ? "Copied!" : "Copy URL"}
            </Button>
          </XStack>
        </YStack>

        <YStack gap="$2">
          <H2>Sandbox URL</H2>
          <XStack gap="$2" alignItems="center" flexWrap="wrap">
            <Link href={sandboxUrl} target="_blank">
              <Text
                color="$blue10"
                numberOfLines={1}
                width={300}
                display="block"
                textOverflow="ellipsis"
              >
                {sandboxUrl}
              </Text>
            </Link>
            <Button
              size="$3"
              onPress={() => handleCopy(sandboxUrl, setCopiedSandbox)}
              backgroundColor={copiedSandbox ? "$green8" : "$blue8"}
              color="white"
            >
              {copiedSandbox ? "Copied!" : "Copy URL"}
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </Stack>
  </Stack>
}
