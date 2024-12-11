import { H3, Paragraph, YStack } from "tamagui";
import { OnboardingStep, StepType } from "../../contexts/step.type";
import { MediaContentStep } from "../../OnboardingSteps/MediaContent/MediaContent.page";
import { QuestionPage } from "../../OnboardingSteps/Question/Question.page";

export const StepsRenderer = ({ step }: { step: OnboardingStep }) => {
  switch (step.type) {
    case StepType.Question:
      return (
        <QuestionPage step={step} />
      )
    case StepType.MediaContent:
      return (
        <MediaContentStep step={step} />
      )
    case StepType.Picker:
    default:
      return (
        <YStack padding="$4" flex={1} justifyContent="center">
          <H3>{step.type}</H3>
          <Paragraph >{step.name}</Paragraph>
        </YStack>
      )
  }
};

