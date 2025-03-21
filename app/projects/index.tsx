import { useProjects } from "@/hooks/useProjects";
import { Stack, ListItem, Button, ScrollView, H1, Dialog } from "tamagui";
import { useState } from "react";
import NewProjectDialog from "@/components/Lib/NewProjectDialog";

export default function Projects() {
  const { projects, createNewProject, deleteProject } = useProjects();

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCreateProject = (projectName: string) => {
    createNewProject.mutate(projectName);
  };

  return (
    <Dialog modal>
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
        <Dialog.Trigger asChild>

          <Button
            size="$3"
            marginTop="$4"
            onPress={() => setModalVisible(true)}
          >
            Create New Project
          </Button>
        </Dialog.Trigger>
      </Stack>
      <NewProjectDialog
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateProject}
      />
    </Dialog>
  );
}
