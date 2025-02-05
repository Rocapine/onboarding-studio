import { Heading, Input, Label, YStack } from "tamagui"
import { ReminderStepType } from "../step.type"
import React, { useState } from "react";

type StepType = ReminderStepType
type StepPayload = StepType['payload']

export const ReminderEditor = ({ updateStep, step }: { updateStep: (step: StepType) => void, step: StepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    ...step.payload
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
    <YStack gap="$1">
      <Heading>Question Editor</Heading>
      <Label>Title</Label>
      <Input
        placeholder="Question"
        value={formData.title}
        onChangeText={handleChange('title')}
      />
      <Label>Subtitle</Label>
      <Input
        placeholder="Subtitle"
        value={formData.subtitle}
        onChangeText={handleChange('subtitle')}
      />
    </YStack >
  )
}

