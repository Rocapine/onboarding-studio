import { YStack, H3, Paragraph } from "tamagui";
import { CustomScreenStepType } from "../step.type";

type ContentProps = {
  step: CustomScreenStepType;
};

export const CustomScreenStep = ({ step }: ContentProps) => {
  return (<YStack padding="$4" flex={1} justifyContent="center">
    <H3>{step.type}</H3>
    <Paragraph>{step.name}</Paragraph>
  </YStack>)
};
