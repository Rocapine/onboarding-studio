import { YStack, Text, Image, XStack, Stack, View, H3, Paragraph } from "tamagui";
import { useIPhoneContext } from "../../contexts/iphone-context";
import { Button } from "../../components/Lib/Button";
import LottieView from "lottie-react-native";
import { CustomScreenStepType } from "../../contexts/step.type";

type ContentProps = {
  step: CustomScreenStepType;
};

export const CustomScreenStep = ({ step }: ContentProps) => {
  return (<YStack padding="$4" flex={1} justifyContent="center">
    <H3>{step.type}</H3>
    <Paragraph >{step.name}</Paragraph>
  </YStack>)
};
