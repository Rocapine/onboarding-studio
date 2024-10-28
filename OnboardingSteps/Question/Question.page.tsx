import { H3, Paragraph, XStack, YStack } from "tamagui"
import { QuestionStepType } from "../../contexts/step.type"

export const QuestionPage = ({ step }: { step: QuestionStepType }) => {
  return (
    <YStack padding="$4" flex={1} justifyContent="center">
      <H3>{step.payload.title}</H3>
      {step.payload.answers.map((answer, answerIndex) => (
        <XStack key={`answer-${answerIndex}`} gap="$2">
          <Paragraph>{answer.label}</Paragraph>
        </XStack>
      ))}
    </YStack>
  )
}
