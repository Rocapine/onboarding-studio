import { View, Text } from "@tamagui/core";
import { H3, H6 } from "tamagui";
import { useSteps } from "../contexts/steps-context";
import { Paragraph } from "tamagui";

export default function MobileScreenPreview() {
  const { selectedStep } = useSteps();
  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="center" backgroundColor={"$accentBackground"}>
      <View width={375} height={812} borderRadius={40} overflow="hidden" borderColor={"$borderColor"} backgroundColor={"$background"} borderWidth={2}>
        <View height={44} backgroundColor={"$statusBarBackground"} justifyContent="center" alignItems="center">
          <H6 color={"$white"}>9:41 AM</H6>
        </View>
        <View flex={1} justifyContent="center" alignItems="center" gap="$4" backgroundColor={"$screenBackground"}>
          <H3>{selectedStep?.type}</H3 >
          <Paragraph color={"$pink"}>{selectedStep?.name}</Paragraph>
        </View>
      </View>
    </View>
  );
}
