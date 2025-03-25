import { useLocalSearchParams } from "expo-router";
import { H1, H2, Stack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);
  console.log(deployment.data)

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.name}</H1>
      <H2>Deployments</H2>
    </Stack>
  </Stack>
}
