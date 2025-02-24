import { H3, Paragraph, YStack } from "tamagui";
import { OnboardingStep, STEP_TYPES } from "../../OnboardingSteps/step.type";
import { MediaContentStep } from "../../OnboardingSteps/MediaContent/MediaContent.page";
import { QuestionPage } from "../../OnboardingSteps/Question/Question.page";
import { CustomScreenStep } from "../../OnboardingSteps/CustomScreen/CustomScreen.page";
import { PickerStep } from "../../OnboardingSteps/Picker/Picker.page";
import { CarouselScreenStep } from "../../OnboardingSteps/Carousel/Carousel.page";
import { ReminderScreenStep } from "../../OnboardingSteps/Reminder/Reminder.page";

export const StepsRenderer = ({ step }: { step: OnboardingStep }) => {
  switch (step.type) {
    case STEP_TYPES.Question: return <QuestionPage step={step} />
    case STEP_TYPES.MediaContent: return <MediaContentStep step={step} />
    case STEP_TYPES.Picker: return <PickerStep step={step} />
    case STEP_TYPES.CustomScreen: return <CustomScreenStep step={step} />
    case STEP_TYPES.Carousel: return <CarouselScreenStep step={step} />
    case STEP_TYPES.Reminder: return <ReminderScreenStep step={step} />
    default:
      const unknownStep: any = step;
      return (
        <YStack padding="$4" flex={1} justifyContent="center">
          <H3>{unknownStep.type}</H3>
          <Paragraph >{unknownStep.name}</Paragraph>
        </YStack>
      )
  }
};

