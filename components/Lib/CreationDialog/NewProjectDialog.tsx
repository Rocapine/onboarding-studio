import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';
import { Team } from '@/hooks/useTeams';
import { SelectItem } from '../Select';

interface NewProjectDialogProps {
  onSubmit: (projectName: string, teamId: string) => void;
  teams: Team[]
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ onSubmit, teams }) => {
  const [projectName, setProjectName] = useState('');
  const teamSelectState = useState<Team["id"] | undefined>(teams[0]?.id);

  const handleSubmit = () => {
    if (!teamSelectState[0]) {
      console.error("No team selected");
      return;
    }
    onSubmit(projectName, teamSelectState[0]);
    setProjectName('');
  };

  return (
    <CreationDialog>
      <Dialog.Title>Create Project</Dialog.Title>
      <YStack gap={"$4"}>
        <SelectItem state={teamSelectState} items={teams} selectLabel='Teams' />
        <Input
          placeholder="Enter Project Name"
          value={projectName}
          onChangeText={setProjectName}
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

export default NewProjectDialog;
