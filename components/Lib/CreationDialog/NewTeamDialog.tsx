import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';
import { generateSlug } from '../../../utils/string.utils';

interface NewProjectDialogProps {
  onSubmit: ({ name, slug }: { name: string, slug: string }) => void;
}

export const NewTeamDialog: React.FC<NewProjectDialogProps> = ({ onSubmit }) => {
  const [teamName, setTeamName] = useState('');
  const [teamSlug, setTeamSlug] = useState('')

  const handleSubmit = () => {
    const slug = teamSlug || generateSlug(teamName);
    onSubmit({ name: teamName, slug });
    setTeamName("");
    setTeamSlug("");
  };

  return (
    <CreationDialog>
      <Dialog.Title>Create Team</Dialog.Title>
      <YStack gap={"$4"}>
        <Input
          placeholder="Enter Team Name"
          value={teamName}
          onChangeText={setTeamName}
        />
        <Input
          placeholder={generateSlug(teamName) || "Team Slug"}
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
