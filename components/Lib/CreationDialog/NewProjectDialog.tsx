import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';

interface NewProjectDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (projectName: string) => void;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ visible, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = () => {
    onSubmit(projectName);
    setProjectName('');
    onClose();
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
          <Button onPress={onClose}>Close</Button>
        </Dialog.Close>
      </YStack>
    </CreationDialog>
  );
};

export default NewProjectDialog;
