import { Link, useLocalSearchParams } from "expo-router";
import { Button, Card, H1, H2, ScrollView, Stack, Text, XStack, YStack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
import { Suspense, useState } from "react";
import { LoadingScreen } from "@/components/Loading";
import { format } from "date-fns";

export default function Deployments() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DeploymentsPage />
    </Suspense>
  );
}

function DeploymentsPage() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { deployments, project, promote, productionUrl, sandboxUrl } = useDeployments(projectId);

  const [copiedProduction, setCopiedProduction] = useState(false);
  const [copiedSandbox, setCopiedSandbox] = useState(false);

  const handleCopy = async (url: string, setCopied: (value: boolean) => void) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {project.name}</H1>
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
              color="white"
            >
              {copiedSandbox ? "Copied!" : "Copy URL"}
            </Button>
          </XStack>
        </YStack>
      </YStack>
      <ScrollView>
        {deployments.map(deployment => {
          return (
            <Card key={deployment.id} elevate bordered padding="$4" marginVertical="$2">
              <YStack>
                <Text fontSize="$6" fontWeight="bold">{`${deployment.id} • ${deployment.environment}`}</Text>
                <Text color="$gray11">{`${format(new Date(deployment.created_at), 'yyyy-MM-d, h:mm a')}`}</Text>
              </YStack>
            </Card>
          )
        })}
      </ScrollView>
    </Stack>
  </Stack >
}
