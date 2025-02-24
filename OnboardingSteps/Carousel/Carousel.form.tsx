import { Button, Heading, Input, Label, XStack, YStack } from "tamagui"
import { CarouselStepType } from "../step.type"
import React, { useState } from "react";

type StepType = CarouselStepType
type StepPayload = StepType['payload']

export const CarouselEditor = ({ updateStep, step }: { updateStep: (step: StepType) => void, step: StepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    screens: step.payload.screens ?? [],
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
      <Heading>Carousel Editor</Heading>

      <Label>Screens</Label>
      <ScreenEditor items={formData.screens} onUpdate={handleChange('screens')} />
    </YStack >
  )
}

type Item = StepPayload['screens'][number]

const ScreenEditor = ({ items, onUpdate }: { items: Item[], onUpdate: (items: Item[]) => void }) => {
  const handleInputChange = (itemIndex: number, field: keyof Item, value: string) => {
    items[itemIndex][field] = value
    onUpdate(items);
  };

  const handleAddItem = () => {
    items.push({ mediaUrl: '', title: '', subtitle: "" })
    onUpdate(items);
  }


  return (
    <YStack gap="$2">
      {items.map((answer, answerIndex) => (
        <XStack key={`answer-${answerIndex}`} gap="$2" alignItems="center">
          <Input
            flex={1}
            placeholder="MediaUrl"
            defaultValue={answer.mediaUrl}
            onChangeText={(text) => handleInputChange(answerIndex, 'mediaUrl', text)}
          />
          <Input
            flex={1}
            placeholder="Title"
            defaultValue={answer.title}
            onChangeText={(text) => handleInputChange(answerIndex, 'title', text)}
          />

          <Input
            flex={1}
            placeholder="Subtitle"
            defaultValue={answer.subtitle}
            onChangeText={(text) => handleInputChange(answerIndex, 'subtitle', text)}
          />
        </XStack>
      ))}
      <Button onPress={() => handleAddItem()}>Add Item</Button>
    </YStack>
  )
};
