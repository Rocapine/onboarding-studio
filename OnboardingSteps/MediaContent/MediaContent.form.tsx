import { Heading, Input, Label, TextArea, YStack } from "tamagui"
import { MediaContentStepType } from "../step.type"
import { useState } from "react";

type StepPayload = MediaContentStepType['payload']

export const MediaContentEditor = ({ updateStep, step }: { updateStep: (step: MediaContentStepType) => void, step: MediaContentStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    imageUrl: step.payload.imageUrl ?? '',
    title: step.payload.title ?? '',
    description: step.payload.description ?? '',
    socialProof: step.payload.socialProof ?? {
      numberOfStar: 0,
      content: '',
      authorName: ''
    }
  });

  const handleChange = <Field extends keyof StepPayload, SubField extends keyof NonNullable<StepPayload[Field]> | undefined>(field: Field, subField?: SubField) => (
    value: SubField extends keyof NonNullable<StepPayload[Field]>
      ? NonNullable<StepPayload[Field]>[SubField]
      : NonNullable<StepPayload[Field]>
  ) => {
    let newValue = value
    if (subField) {
      // @ts-ignore
      newValue = { ...(formData[field] as object), [subField]: value }
    }
    const updatedFormData = { ...formData, [field]: newValue };
    setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData });
  };


  return (
    <YStack>
      <Heading>Media Content Editor</Heading>
      <Label>Image URL</Label>
      <Input
        placeholder="Image URL"
        value={formData.imageUrl}
        onChangeText={handleChange('imageUrl')}
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
      <Label>Social Proof</Label>
      <TextArea
        placeholder="Social Proof"
        value={formData.socialProof?.content}
        onChangeText={handleChange('socialProof', "content")}
      />
      <Label>Author</Label>
      <Input
        placeholder="Social Proof"
        value={formData.socialProof?.authorName}
        onChangeText={handleChange('socialProof', "authorName")}
      />
    </YStack>
  )
}