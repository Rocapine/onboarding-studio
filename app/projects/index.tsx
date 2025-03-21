import { useProjects } from "@/hooks/useProjects";
import { Stack, ListItem, Button, ScrollView, H1, Dialog } from "tamagui";
import { useState } from "react";
import { format } from "date-fns";
import NewProjectDialog from "@/components/Lib/NewProjectDialog";
import { useRouter } from "expo-router";

export default function Projects() {
  const { projects, createNewProject, deleteProject } = useProjects();

  const router = useRouter();
  const onProjectPress = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

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
            <ListItem onPress={() => onProjectPress(project.id)} key={project.id} title={project.name} subTitle={`${format(new Date(project.created_at), 'yyyy-MM-d, h:mm a')}`}>
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
