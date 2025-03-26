import { useState } from "react";
import { Heading, Input, Label, Select, TextArea, YStack } from "tamagui";
import { MediaContentStepType, MediaSource } from "../step.type";

type StepPayload = MediaContentStepType['payload']

export const MediaContentEditor = ({ updateStep, step }: { updateStep: (step: MediaContentStepType) => void, step: MediaContentStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    mediaSource: step.payload.mediaSource ?? {
      type: "image",
      url: "",
    },
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
      <MediaSourceEditor mediaSource={formData.mediaSource} onChange={handleChange('mediaSource')} />
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

const MediaSourceEditor = ({ mediaSource, onChange }: { mediaSource: MediaSource, onChange: (mediaSource: MediaSource) => void }) => {
  const [sourceType, setSourceType] = useState<'url' | 'localPathId'>(
    'url' in mediaSource ? 'url' : 'localPathId'
  );

  const handleTypeChange = (type: MediaSource['type']) => {
    const newMediaSource: MediaSource = sourceType === 'url'
      ? { type, url: '' }
      : { type, localPathId: '' };
    onChange(newMediaSource);
  };

  const handleSourceChange = (value: string) => {
    const newMediaSource: MediaSource = sourceType === 'url'
      ? { type: mediaSource.type, url: value }
      : { type: mediaSource.type, localPathId: value };
    onChange(newMediaSource);
  };

  const currentValue = sourceType === 'url'
    ? ('url' in mediaSource ? mediaSource.url : '')
    : ('localPathId' in mediaSource ? mediaSource.localPathId : '');

  return (
    <YStack>
      <Label>Media Type</Label>
      <Select
        value={mediaSource.type}
        onValueChange={handleTypeChange}
      >
        <Select.Trigger >
          <Select.Value placeholder="Select media type" />
        </Select.Trigger>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label>Media Types</Select.Label>
              <Select.Item value="image" index={0}>
                <Select.ItemText>Image</Select.ItemText>
              </Select.Item>
              <Select.Item value="lottie" index={1}>
                <Select.ItemText>Lottie</Select.ItemText>
              </Select.Item>
              <Select.Item value="rive" index={2}>
                <Select.ItemText>Rive</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select>

      <Label>Source Type</Label>
      <Select
        value={sourceType}
        onValueChange={(value: 'url' | 'localPathId') => {
          setSourceType(value);
          const newMediaSource: MediaSource = value === 'url'
            ? { type: mediaSource.type, url: '' }
            : { type: mediaSource.type, localPathId: '' };
          onChange(newMediaSource);
        }}
      >
        <Select.Trigger >
          <Select.Value placeholder="Select source type" />
        </Select.Trigger>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label>Source Types</Select.Label>
              <Select.Item value="url" index={0}>
                <Select.ItemText>URL</Select.ItemText>
              </Select.Item>
              <Select.Item value="localPathId" index={1}>
                <Select.ItemText>Local Path ID</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select>

      <Label>{sourceType === 'url' ? 'URL' : 'Local Path ID'}</Label>
      <Input
        placeholder={sourceType === 'url' ? 'Enter URL' : 'Enter Local Path ID'}
        value={currentValue}
        onChangeText={handleSourceChange}
      />
    </YStack>
  );
}