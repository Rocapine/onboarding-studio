import { H3, Paragraph, YStack } from "tamagui";
import { StepProperties, StepType } from "../../contexts/step.type";
import { MediaContentStep } from "../../OnboardingSteps/MediaContent/MediaContent.page";
import { QuestionPage } from "../../OnboardingSteps/Question/Question.page";

export const StepsRenderer = ({ step }: { step: StepProperties }) => {
  switch (step.type) {
    case StepType.Question:
      return (
        <QuestionPage step={step} />
      )
    case StepType.Picker:
      return (
        <YStack padding="$4" flex={1} justifyContent="center">
          <H3>{step.type}</H3>
          <Paragraph >{step.name}</Paragraph>
        </YStack>
      )
    case StepType.MediaContent:
      return (
        <MediaContentStep step={step} />
      )
    default:
      return null;
  }
};

