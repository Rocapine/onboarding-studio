import { YStack, H3, Paragraph } from "tamagui";
import { ReminderStepType } from "../step.type";

type ContentProps = {
  step: ReminderStepType;
};

export const ReminderScreenStep = ({ step }: ContentProps) => {
  return (<YStack padding="$4" flex={1} justifyContent="center">
    <H3>{step.type}</H3>
    <Paragraph>{step.payload.title}</Paragraph>
    <Paragraph>{step.payload.subtitle}</Paragraph>
  </YStack>)
};
