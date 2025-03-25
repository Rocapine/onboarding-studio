import { useLocalSearchParams } from "expo-router";
import { H1, Stack } from "tamagui";
import { useDeployments } from "@/hooks/useDeployments";
export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const deployment = useDeployments(projectId);

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Project {deployment.data.projects.name}</H1>
      <H1>Deployments</H1>
    </Stack>
  </Stack>
}
