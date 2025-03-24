import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';

interface NewProjectDialogProps {
  onSubmit: ({ teamName, teamSlug }: { teamName: string, teamSlug: string }) => void;
}

export const NewTeamDialog: React.FC<NewProjectDialogProps> = ({ onSubmit }) => {
  const [teamName, setTeamName] = useState('');
  const [teamSlug, setTeamSlug] = useState('')

  const handleSubmit = () => {
    onSubmit({ teamName, teamSlug });
    setTeamName('');
    setTeamSlug("");
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        key="overlay"
        backgroundColor="$shadow6"
        animation="quicker"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Dialog.Content bordered
        elevate
        key="content"
        animateOnly={['transform', 'opacity']}
        animation={[
          'quickest',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        gap="$4">
        <YStack gap={"$4"}>
          <Input
            placeholder="Enter Team Name"
            value={teamName}
            onChangeText={setTeamName}
          />
          <Input
            placeholder="Team Slug"
            value={teamSlug}
            onChangeText={setTeamSlug}
          />
          <Dialog.Close asChild>
            <Button onPress={handleSubmit}>Submit</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Close</Button>
          </Dialog.Close>
        </YStack>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
