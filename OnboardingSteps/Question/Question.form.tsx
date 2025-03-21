import { Button, Checkbox, Heading, Input, Label, Stack, TextArea, XStack, YStack } from "tamagui"
import { Answer, QuestionStepType } from "../step.type"
import React, { useState } from "react";
import { Wand2, Check as CheckIcon, Trash2 } from "@tamagui/lucide-icons";
import { generateSlug } from "@/utils/string.utils";

type StepType = QuestionStepType
type StepPayload = StepType['payload']

export const QuestionEditor = ({ updateStep, step }: { updateStep: (step: StepType) => void, step: StepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    answers: step.payload.answers ?? [],
    title: step.payload.title ?? '',
    subtitle: step.payload.subtitle ?? '',
    multipleAnswer: step.payload.multipleAnswer ?? true,
    infoBox: step.payload.infoBox ?? {
      title: "",
      content: "",
    },
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
      <XStack alignItems="center">
        <Label flex={1}>Multiple Answer</Label>
        <Checkbox
          checked={formData.multipleAnswer}
          onCheckedChange={(checked) => handleChange('multipleAnswer')(typeof checked === "boolean" ? checked : false)}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
      </XStack>

      <Label>Answers</Label>
      <AnswerEditor answers={formData.answers} onUpdate={handleChange('answers')} />
      <Label>Info Box</Label>
      <Input
        placeholder="Info Box title"
        value={formData.infoBox?.title}
        onChangeText={handleChange('infoBox', 'title')}
      />
      <TextArea
        placeholder="Info Box content"
        value={formData.infoBox?.content}
        onChangeText={handleChange("infoBox", "content")}
      />
    </YStack >
  )
}


const AnswerEditor = ({ answers, onUpdate }: { answers: Answer[], onUpdate: (answers: Answer[]) => void }) => {
  const handleInputChange = (answerIndex: number, field: keyof Answer, text: string) => {
    answers[answerIndex][field] = text
    onUpdate(answers);
  };

  const handleAddAnswer = () => {
    answers.push({ label: '', value: '' })
    onUpdate(answers);
  }

  const handleRemoveAnswer = (answerIndex: number) => {
    answers.splice(answerIndex, 1);
    onUpdate(answers);
  }

  const handleGenerateValue = (answerIndex: number) => {
    const label = answers[answerIndex].label;
    const generatedValue = generateSlug(label);
    handleInputChange(answerIndex, 'value', generatedValue);
  };

  return (
    <YStack gap="$2">
      {answers.map((answer, answerIndex) => (
        <XStack key={`answer-${answerIndex}`} gap="$2" alignItems="center">
          <Input
            flex={1}
            placeholder="Label"
            defaultValue={answer.label}
            onChangeText={(text) => handleInputChange(answerIndex, 'label', text)}
          />
          <Input
            flex={1}
            placeholder="Value"
            defaultValue={answer.value}
            onChangeText={(text) => handleInputChange(answerIndex, 'value', text)}
          />
          <Stack onPress={() => handleGenerateValue(answerIndex)}>
            <Wand2 />
          </Stack>
          <Input
            flex={1}
            placeholder="Description"
            defaultValue={answer.description}
            onChangeText={(text) => handleInputChange(answerIndex, 'description', text)}
          />
          <Button onPress={() => handleRemoveAnswer(answerIndex)}><Trash2 strokeWidth={1} /></Button>
        </XStack>
      ))}
      <Button onPress={() => handleAddAnswer()}>Add Answer</Button>
    </YStack>
  )
};

