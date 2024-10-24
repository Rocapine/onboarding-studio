import { H3, Paragraph, View } from "tamagui";
import { StepProperties } from "../../contexts/step.type";

export const StepsRenderer = ({ step }: { step: StepProperties }) => {
  return (
    <View>
      <H3>{step.type}</H3>
      <Paragraph color={"$pink"}>{step.name}</Paragraph>
    </View>
  )
};

