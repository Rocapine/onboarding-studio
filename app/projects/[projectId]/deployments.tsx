import { useLocalSearchParams } from "expo-router";
import { H1, Stack } from "tamagui";
import { useProject } from "@/hooks/useProject";
export default function Deployments() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project } = useProject(projectId);

  return <Stack backgroundColor={"$background"} flex={1} flexDirection="row">
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Deployments</H1>
    </Stack>
  </Stack>
}
