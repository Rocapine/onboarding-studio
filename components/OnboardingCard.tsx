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
}

export const OnboardingCard = ({ onboarding, createdBy, projectId, updateOnboardingName }: OnboardingCardProps) => {
  const [name, setName] = useState(onboarding.name);
  const localUpdateOnboardingName = useCallback((newName: string) => {
    setName(newName)
    updateOnboardingName({ id: onboarding.id, name: newName });
  }, [onboarding.id, updateOnboardingName]);

  return <Card key={onboarding.id} elevate bordered padding="$4" marginVertical="$2">
    <XStack alignItems="center" justifyContent="space-between">
      <YStack>
        <Input padding={0} margin={0} borderWidth={0} fontSize="$6" fontWeight="bold" value={name} onChangeText={localUpdateOnboardingName} />
        <Text fontSize="$6" fontWeight="bold" color="$gray11">{createdBy}</Text>
        <Text color="$gray11">
          Last edited: {format(new Date(onboarding.edited_at), 'yyyy-MM-dd, h:mm a')} •
          {onboarding.published_at
            ? ` Last published: ${format(new Date(onboarding.published_at), 'yyyy-MM-dd, h:mm a')}`
            : ' Never published'}
        </Text>
      </YStack>
      <XStack gap="$2">
        <Link href={`/projects/${projectId}/onboardings/${onboarding.id}/steps`}>
          <Button size="$2">Edit Steps</Button>
        </Link>
        <Button size="$2">Publish</Button>
      </XStack>
    </XStack>
  </Card>
}