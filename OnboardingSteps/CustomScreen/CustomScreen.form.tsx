import { Heading, Input, Label, TextArea, YStack } from "tamagui"
import { CustomScreenStepType } from "../step.type"
import { useState } from "react";

type StepPayload = CustomScreenStepType['payload']

export const CustomScreenEditor = ({ updateStep, step }: { updateStep: (step: CustomScreenStepType) => void, step: CustomScreenStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    customScreenId: step.payload.customScreenId ?? '',
    type: step.payload.type ?? '',
    content: step.payload.content ?? {},
  });

  const [contentString, setContentString] = useState<string>(JSON.stringify(formData.content, null, 2));
  const [isValidContentString, setIsValidContentString] = useState<boolean>(true);

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

  const validateContent = (value: string) => {
    setContentString(value);
    try {
      const parsedValue = JSON.parse(value);
      handleChange('content')(parsedValue);
      setIsValidContentString(true);
    } catch (error) {
      setIsValidContentString(false);
    }
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

      <Label>Content <Label color={isValidContentString ? 'green' : 'red'}>{isValidContentString ? 'Valid' : 'Invalid'}</Label></Label>
      <TextArea
        placeholder="Custom Screen ID"
        value={contentString}
        onChangeText={validateContent}
        // @ts-ignore
        style={{ resize: 'vertical' }}
      />
    </YStack>
  )
}