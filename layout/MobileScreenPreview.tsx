import { View, Text } from "@tamagui/core";

export default function MobileScreenPreview() {
  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="center" backgroundColor={"$accentBackground"}>
      <Text color={"$accentColor"}>MobileScreenPreview</Text>
    </View>
  );
}
