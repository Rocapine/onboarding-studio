import { useProjects } from "@/hooks/useProjects";
import { Stack, ListItem, Button, ScrollView, H1 } from "tamagui";

export default function Projects() {
  const { projects, createNewProject, deleteProject } = useProjects();

  return (
    <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Projects</H1>
      <ScrollView>

        {projects?.map((project) => (
          <ListItem key={project.id} title={project.name} subTitle={`ID: ${project.id}`}>
            <Button
              size="$2"
              color="$red10"
              onPress={() => deleteProject.mutate(project.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </ScrollView>
      <Button
        size="$3"
        marginTop="$4"
        onPress={() => createNewProject.mutate("Coucou New Project")}
      >
        Create New Project
      </Button>
    </Stack>
  );
}