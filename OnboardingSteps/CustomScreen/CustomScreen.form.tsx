import { useState } from "react";
import { Heading, Input, Label, YStack } from "tamagui";
import { CustomScreenStepType } from "../step.type";

type StepPayload = CustomScreenStepType['payload']

export const CustomScreenEditor = ({ updateStep, step }: { updateStep: (step: CustomScreenStepType) => void, step: CustomScreenStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    customScreenId: step.payload.customScreenId ?? '',
    type: step.payload.type ?? '',
  });

  const handleChange = <Field extends keyof StepPayload, SubField extends keyof NonNullable<StepPayload[Field]> | undefined>(field: Field, subField?: SubField) => (
    value: SubField extends keyof NonNullable<StepPayload[Field]>
      ? NonNullable<StepPayload[Field]>[SubField]
      : NonNullable<StepPayload[Field]>
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData });
  };

  const validateCustomScreenId = (value: string) => {
    // Remove spaces and special characters from the input value
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
    handleChange('customScreenId')(sanitizedValue);
  };

  return (
    <YStack>
      <Heading>Custom Screen Editor</Heading>
      <Label>Type</Label>
      <Input
        placeholder="Custom Screen ID"
        value={formData.type}
        onChangeText={handleChange('type')}
      />
      <Label>Custom Screen ID</Label>
      <Input
        placeholder="Custom Screen ID"
        value={formData.customScreenId}
        onChangeText={validateCustomScreenId}
      />
    </YStack>
  )
}