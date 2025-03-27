import { LoadingScreen } from "@/components/Loading";
import { OnboardingCard } from "@/components/OnboardingCard";
import { useOnboardings } from "@/hooks/useOnboardings";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { H1, ScrollView, View } from "tamagui";

export default function Onboardings() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <OnboardingsPage />
    </Suspense>
  )
}

function OnboardingsPage() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { onboardings, updateOnboardingName, project } = useOnboardings(projectId);
  return (
    <View flex={1} backgroundColor={"$background"} padding={"$4"} gap={"$4"}>
      <H1>Onboardings {project.name}</H1>
      <ScrollView>
        {onboardings.map((onboarding) => (
          <OnboardingCard key={onboarding.id} onboarding={onboarding} createdBy={onboarding.created_by.email} projectId={projectId} updateOnboardingName={updateOnboardingName} />
        ))}
      </ScrollView>
    </View>
  )
}