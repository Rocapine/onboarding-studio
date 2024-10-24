import { H3, Paragraph, View, YStack } from "tamagui";
import { StepProperties, StepType } from "../../contexts/step.type";

export const StepsRenderer = ({ step }: { step: StepProperties }) => {
  switch (step.type) {
    case StepType.Question:
      return (
        <View>
          <H3>{step.type}</H3>
          <Paragraph color={"$pink"}>{step.name}</Paragraph>
        </View>
      )
    case StepType.Picker:
      return (
        <View>
          <H3>{step.type}</H3>
          <Paragraph color={"$pink"}>{step.name}</Paragraph>
        </View>
      )
    case StepType.HalfImageHalfContent:
      return (
        <View flex={1} alignItems="center" justifyContent="center">
          <Image source={{ uri: step.payload.image }} />
          <YStack gap="$4">

            <Paragraph color={"$pink"}>{step.name}</Paragraph>
          </YStack>
        </View>
      )
    default:
      return null;
  }
};

