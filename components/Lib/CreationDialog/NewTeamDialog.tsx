import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';

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
    <CreationDialog>
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
    </CreationDialog>
  );
};
