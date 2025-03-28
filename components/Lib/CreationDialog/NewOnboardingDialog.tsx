import React, { useState } from 'react';
import { Dialog, Input, Button, YStack, Label } from 'tamagui';
import { CreationDialog } from './CreationDialog';
import { SelectItem } from '../Select';
import { Onboarding } from '@/hooks/useOnboardings';
import { initialSteps } from '@/contexts/steps-context';

interface NewOnboardingDialogProps {
  onSubmit: (args: { name: string, steps: Onboarding['steps'] }) => void;
  existingOnboardingSteps: Onboarding[]
}

const NewOnboardingDialog: React.FC<NewOnboardingDialogProps> = ({ onSubmit, existingOnboardingSteps }) => {
  const stepsTemplates = [...existingOnboardingSteps, { id: "empty-onboarding", name: "Empty Onboarding", steps: initialSteps }].map((onboarding) => ({
    name: onboarding.name, id: onboarding.id, steps: onboarding.steps
  }));
  const [onboardingName, setOnboardingName] = useState('');
  const stepsTemplateSelectState = useState<string | undefined>(stepsTemplates[0].id);

  const handleSubmit = () => {
    if (!stepsTemplateSelectState[0]) {
      console.error("No team selected");
      return;
    }
    const steps = stepsTemplates.find((onboarding) => onboarding.id === stepsTemplateSelectState[0])?.steps;
    onSubmit({ name: onboardingName, steps: steps ?? initialSteps });
    setOnboardingName('');
  };

  return (
    <CreationDialog>
      <Dialog.Title>Create Onboarding</Dialog.Title>
      <YStack gap={"$4"}>
        <Label>Import from existing onboarding</Label>
        <SelectItem state={stepsTemplateSelectState} items={stepsTemplates} selectLabel='Teams' />
        <Input
          placeholder="Enter Onboarding Name"
          value={onboardingName}
          onChangeText={setOnboardingName}
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

export default NewOnboardingDialog;
