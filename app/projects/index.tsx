import { useProjects } from "@/hooks/useProjects";
import { Paragraph, Stack } from "tamagui";

export default function Projects() {
  const { projects, createNewProject } = useProjects();

  return (
    <Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center">
      <Paragraph>Projects</Paragraph>
      {projects?.map((project) => (
        <Paragraph key={project.id}>{project.name}</Paragraph>
      ))}
      <Paragraph onPress={() => createNewProject.mutate("New Project")}>Create New Project</Paragraph>
    </Stack>
  )
}