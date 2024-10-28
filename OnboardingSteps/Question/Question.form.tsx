import { Button, Heading, Input, Label, Stack, TextArea, View, XStack, YStack } from "tamagui"
import { Answer, QuestionStepType } from "../../contexts/step.type"
import { useState } from "react";
import { RotateCw, Wand2 } from "@tamagui/lucide-icons";

type StepPayload = QuestionStepType['payload']

export const QuestionEditor = ({ updateStep, step }: { updateStep: (step: QuestionStepType) => void, step: QuestionStepType }) => {
  const [formData, setFormData] = useState<StepPayload>({
    answers: step.payload.answers || [],
    title: step.payload.title || ''
  });


  const handleChange = <K extends keyof StepPayload>(field: K) => (value: StepPayload[K]) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    updateStep({ ...step, payload: updatedFormData } as QuestionStepType);
  };

  return (
    <View>
      <Heading>Media Content Editor</Heading>
      <Label>Question</Label>
      <Input
        placeholder="Question"
        value={formData.title}
        onChangeText={handleChange('title')}
      />
      <Label>Answers</Label>
      <AnswerEditor answers={formData.answers} onUpdate={handleChange('answers')} />
    </View>
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
            placeholder="Label"
            defaultValue={answer.label}
            onChangeText={(text) => handleInputChange(answerIndex, 'label', text)}
          />
          <Input
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
