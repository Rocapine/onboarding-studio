import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';

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
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default NewProjectDialog;
