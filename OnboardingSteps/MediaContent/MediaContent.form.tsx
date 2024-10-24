import { Button, Heading, Input, Label, View } from "tamagui"
import { MediaContentStepType } from "../../contexts/step.type"
import { useState } from "react";

export const MediaContentEditor = ({ updateStep, step }: { updateStep: (step: MediaContentStepType) => void, step: MediaContentStepType }) => {
  const [formData, setFormData] = useState<MediaContentStepType['payload']>({
    imageUrl: step.payload.imageUrl || '',
    title: step.payload.title || '',
    description: step.payload.description || ''
  });

  const handleChange = (field: string) => (value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData } as MediaContentStepType);
  };



  return (
    <View>
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
      <Input
        placeholder="Description"
        value={formData.description}
        onChangeText={handleChange('description')}
      />
    </View>
  )
}