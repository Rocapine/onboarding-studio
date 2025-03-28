import { Onboarding } from "@/hooks/useOnboardings";
import { format } from "date-fns";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Card, Input, Text, XStack, YStack } from "tamagui";

type OnboardingCardProps = {
  onboarding: Onboarding;
  createdBy: string | null;
  projectId: string;
  updateOnboardingName: (arg: { id: Onboarding["id"]; name: Onboarding["name"] }) => void;
  deployOnboarding: () => void;
}

export const OnboardingCard = ({ onboarding, createdBy, projectId, updateOnboardingName, deployOnboarding }: OnboardingCardProps) => {
  const [name, setName] = useState(onboarding.name);
  const localUpdateOnboardingName = useCallback((newName: string) => {
    setName(newName)
    updateOnboardingName({ id: onboarding.id, name: newName });
  }, [onboarding.id, updateOnboardingName]);

  return <Card key={onboarding.id} elevate bordered padding="$4" marginVertical="$2">
    <XStack gap="$2" alignItems="center" justifyContent="space-between">
      <YStack flex={1}>
        <Input padding={0} margin={0} borderWidth={0} fontSize="$6" fontWeight="bold" value={name} onChangeText={localUpdateOnboardingName} />
        <XStack gap="$2" alignItems="baseline">
          <Text fontSize="$6" fontWeight="bold" color="$gray11">{createdBy}</Text>
          <Text color="$gray11">
            | Last edited: {format(new Date(onboarding.edited_at), 'yyyy-MM-dd, h:mm a')} |
          </Text>
          <Text color="$gray11">
            {Array.isArray(onboarding.steps) ? onboarding.steps.length : 0} steps
          </Text>
        </XStack>
      </YStack>
      <XStack gap="$2">
        <Button size="$2" variant="outlined" onPress={deployOnboarding}>
          Deploy to Production
        </Button>
        <Link href={`/projects/${projectId}/onboardings/${onboarding.id}/steps`}>
          <Button size="$2">Edit Steps</Button>
        </Link>
      </XStack>
    </XStack>
  </Card>
}