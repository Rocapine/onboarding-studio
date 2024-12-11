import { Heading, Input, Label, TextArea, YStack } from "tamagui"
import { CustomScreenStepType } from "../../contexts/step.type"
import { useState } from "react";

type StepPayload = CustomScreenStepType['payload']

export const CustomScreenEditor = ({ updateStep, step }: { updateStep: (step: CustomScreenStepType) => void, step: CustomScreenStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    customScreenId: step.payload.customScreenId ?? '',
  });

  const handleChange = <Field extends keyof StepPayload, SubField extends keyof NonNullable<StepPayload[Field]> | undefined>(field: Field, subField?: SubField) => (
    value: SubField extends keyof NonNullable<StepPayload[Field]>
      ? NonNullable<StepPayload[Field]>[SubField]
      : NonNullable<StepPayload[Field]>
  ) => {
    const updatedFormData = { ...formData, [field]: subField ? { ...formData[field], [subField]: value } : value };
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
      <Label>Custom Screen ID</Label>
      <Input
        placeholder="Custom Screen ID"
        value={formData.customScreenId}
        onChangeText={validateCustomScreenId}
      />
    </YStack>
  )
}