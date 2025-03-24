import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';

interface NewProjectDialogProps {
  onSubmit: (projectName: string) => void;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = () => {
    onSubmit(projectName);
    setProjectName('');
  };

  return (
    <CreationDialog>
      <YStack gap={"$4"}>
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
