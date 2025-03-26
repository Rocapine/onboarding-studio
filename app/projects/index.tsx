import { useProjects } from "@/hooks/useProjects";
import { Stack, Button, ScrollView, H1, Dialog, XStack, Card, YStack, Text } from "tamagui";
import { format } from "date-fns";
import NewProjectDialog from "@/components/Lib/CreationDialog/NewProjectDialog";
import { Link, useRouter } from "expo-router";
import { useTeams } from "@/hooks/useTeams";
import { Suspense } from "react";
import { LoadingScreen } from "../../components/Loading";


export default function Projects() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProjectsPage />
    </Suspense>
  );
}

function ProjectsPage() {
  const { projects, createNewProject, deleteProject } = useProjects();
  console.log("projects", projects);
  const { teams } = useTeams();
  console.log("teams", teams);

  const router = useRouter();

  const handleCreateProject = (projectName: string, teamId: string) => {
    createNewProject.mutate({ name: projectName, teamId });
  };

  return (

    <Dialog modal>
      <Stack flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
        <H1>Projects</H1>
        <ScrollView>
          {projects?.map((project) => (
            <Card key={project.id} elevate bordered padding="$4" marginVertical="$2">
              <XStack alignItems="center" justifyContent="space-between">
                <YStack>
                  <Text fontSize="$6" fontWeight="bold">{project.name}</Text>
                  <Text color="$gray11">{`${project.teams?.name} • ${format(new Date(project.created_at), 'yyyy-MM-d, h:mm a')}`}</Text>
                </YStack>
                <XStack gap="$2">
                  <Link href={`/projects/${project.id}/steps`}>
                    <Button size="$2">Steps</Button>
                  </Link>
                  <Link href={`/projects/${project.id}/deployments`}>
                    <Button size="$2">Deployments</Button>
                  </Link>
                </XStack>
              </XStack>
            </Card>
          ))}
        </ScrollView>
        <Dialog.Trigger asChild>
          <Button size="$3" marginTop="$4" >
            Create New Project
          </Button>
        </Dialog.Trigger>
      </Stack>
      <NewProjectDialog
        teams={teams}
        onSubmit={handleCreateProject}
      />
    </Dialog>
  );
}
