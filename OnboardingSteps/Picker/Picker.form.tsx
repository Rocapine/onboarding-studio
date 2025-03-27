import { useState } from "react";
import { Heading, Input, Label, SizableText, TextArea, XStack, YStack } from "tamagui";
import { PickerStepType, PickerType } from "../step.type";

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
    let newValue = value
    if (subField) {
      // @ts-ignore
      newValue = { ...(formData[field]), [subField]: value }
    }
    const updatedFormData = { ...formData, [field]: newValue }; setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData });
  };


  return (
    <YStack>
      <Heading>Picker Editor</Heading>
      <XStack ai="center"><Label>Type </Label><SizableText size={"$2"} color="$color11">({Object.values(PickerType).join(', ')}, etc)</SizableText></XStack>
      <Input
        placeholder="Picker type"
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