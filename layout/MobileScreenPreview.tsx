import { View, Text } from "@tamagui/core";
import { useSteps } from "../contexts/steps-context";

export default function MobileScreenPreview() {
  const { selectedStep } = useSteps();
  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="center" backgroundColor={"$accentBackground"}>
      <View width={375} height={812} borderRadius={40} overflow="hidden" borderColor={"$borderColor"} backgroundColor={"$background"} borderWidth={2}>
        <View height={44} backgroundColor={"$statusBarBackground"} justifyContent="center" alignItems="center">
          <Text color={"$statusBarTextColor"}>9:41 AM</Text>
        </View>
        <View flex={1} justifyContent="center" alignItems="center" gap="$4" backgroundColor={"$screenBackground"}>
          <Text >{selectedStep?.type}</Text>
          <Text >{selectedStep?.name}</Text>
        </View>
      </View>
    </View>
  );
}
