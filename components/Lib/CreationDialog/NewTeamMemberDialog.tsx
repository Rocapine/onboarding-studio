import React, { useState } from 'react';
import { Dialog, Input, Button, YStack } from 'tamagui';
import { CreationDialog } from './CreationDialog';

interface NewProjectDialogProps {
  onSubmit: ({ email }: { email: string }) => void;
}

export const NewTeamMemberDialog: React.FC<NewProjectDialogProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit({ email });
    setEmail('');
  };

  return (
    <CreationDialog>
      <YStack gap={"$4"}>
        <Input
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
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
