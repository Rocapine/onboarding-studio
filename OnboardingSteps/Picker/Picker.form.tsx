import { Heading, Input, Label, TextArea, YStack } from "tamagui"
import { PickerStepType, PickerType } from "../../contexts/step.type"
import { useState } from "react";

type StepType = PickerStepType
type StepPayload = PickerStepType['payload']

export const PickerEditor = ({ updateStep, step }: { updateStep: (step: StepType) => void, step: StepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    title: step.payload.title ?? '',
    pickerType: step.payload.pickerType ?? PickerType.Height
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


  return (
    <YStack>
      <Heading>Picker Editor</Heading>
      <Label>Type</Label>
      <Input
        placeholder="Image URL"
        value={formData.pickerType}
        onChangeText={handleChange('pickerType')}
      />
      <Label>Title</Label>
      <Input
        placeholder="Title"
        value={formData.title}
        onChangeText={handleChange('title')}
      />
      <Label>Description</Label>
      <TextArea
        placeholder="Description"
        value={formData.description}
        onChangeText={handleChange('description')}
      />
    </YStack>
  )
}