import { YStack, H3, Paragraph } from "tamagui";
import { CarouselStepType } from "../step.type";

type ContentProps = {
  step: CarouselStepType;
};

export const CarouselScreenStep = ({ step }: ContentProps) => {
  return (<YStack padding="$4" flex={1} justifyContent="center">
    <H3>{step.type}</H3>
    <Paragraph>{step.name}</Paragraph>
    <Paragraph>{JSON.stringify(step.payload)}</Paragraph>
  </YStack>)
};
