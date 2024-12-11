import { H3, Paragraph, YStack } from "tamagui";
import { OnboardingStep, STEP_TYPES } from "../../contexts/step.type";
import { MediaContentStep } from "../../OnboardingSteps/MediaContent/MediaContent.page";
import { QuestionPage } from "../../OnboardingSteps/Question/Question.page";

export const StepsRenderer = ({ step }: { step: OnboardingStep }) => {
  switch (step.type) {
    case STEP_TYPES.Question:
      return (
        <QuestionPage step={step} />
      )
    case STEP_TYPES.MediaContent:
      return (
        <MediaContentStep step={step} />
      )
    case STEP_TYPES.Picker:
    default:
      return (
        <YStack padding="$4" flex={1} justifyContent="center">
          <H3>{step.type}</H3>
          <Paragraph >{step.name}</Paragraph>
        </YStack>
      )
  }
};

