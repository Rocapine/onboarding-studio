import { Button, Checkbox, Heading, Input, Label, Stack, TextArea, XStack, YStack } from "tamagui"
import { Answer, QuestionStepType } from "../../contexts/step.type"
import React, { useState } from "react";
import { Wand2, Check as CheckIcon } from "@tamagui/lucide-icons";

type StepPayload = QuestionStepType['payload']

export const QuestionEditor = ({ updateStep, step }: { updateStep: (step: QuestionStepType) => void, step: QuestionStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    answers: step.payload.answers || [],
    title: step.payload.title || '',
    multipleAnswer: step.payload.multipleAnswer || true,
    infoBox: step.payload.infoBox || {
      title: "",
      content: "",
    },
  });

  const handleChange = <Field extends keyof StepPayload, SubField extends keyof StepPayload[Field] | undefined>(field: Field, subField?: SubField) => (value: SubField extends keyof StepPayload[Field]
    ? StepPayload[Field][SubField]
    : StepPayload[Field]) => {
    const updatedFormData = { ...formData, [field]: subField ? { ...formData[field], [subField]: value } : value };
    setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData });
  };

  return (
    <YStack gap="$1">
      <Heading>Media Content Editor</Heading>
      <Label>Question</Label>
      <Input
        placeholder="Question"
        value={formData.title}
        onChangeText={handleChange('title')}
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
        value={formData.infoBox.title}
        onChangeText={handleChange('infoBox', 'title')}
      />
      <TextArea
        placeholder="Info Box content"
        value={formData.infoBox.content}
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

  const handleGenerateValue = (answerIndex: number) => {
    const label = answers[answerIndex].label;
    const generatedValue = generateValueFromLabel(label);
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
        </XStack>
      ))}
      <Button onPress={() => handleAddAnswer()}>Add Answer</Button>
    </YStack>
  )
};

const generateValueFromLabel = (label: string) => {
  // Example logic to generate a value from the label
  return label.toLowerCase().replace(/\s+/g, '-');
};
