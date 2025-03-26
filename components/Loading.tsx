import { Activity } from "@tamagui/lucide-icons";
import { YStack, View, Text } from "tamagui";

export const LoadingScreen = () => (
  <View backgroundColor="$background" flex={1} justifyContent="center" alignItems="center">
    <YStack space="$4" alignItems="center">
      <Activity size="$8" color="$color" />
      <Text color="$color" fontSize="$6">Loading your project...</Text>
    </YStack>
  </View>
);
