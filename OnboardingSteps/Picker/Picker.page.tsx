import { YStack, Paragraph, H3 } from "tamagui"
import { PickerStepType } from "../step.type"

type ContentProps = {
  step: PickerStepType;
};

export const PickerStep = ({ step }: ContentProps) => {
  return (<YStack padding="$4" flex={1} justifyContent="center">
    <H3>{step.payload.title}</H3>
    <Paragraph>{step.payload.description}</Paragraph>
    <Paragraph >{step.payload.pickerType} picker</Paragraph>
  </YStack>)
}