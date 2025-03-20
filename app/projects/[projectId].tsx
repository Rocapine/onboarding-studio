import "@expo/metro-runtime";
import { View } from '@tamagui/core';
import { Toast, ToastViewport, useToastState } from "@tamagui/toast";
import { YStack } from "tamagui";
import EditPageForm from '@/layout/EditPageForm';
import MobileScreenPreview from "@/layout/MobileScreenPreview";
import StepsList from '@/layout/StepsList';
import { useLocalSearchParams } from "expo-router/build/hooks";

const Layout = () => {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  console.log('projectId', projectId)
  return (
    <View backgroundColor={"$background"} flex={1} flexDirection="row">
      <ToastViewport />
      <CurrentToast />
      <StepsList />
      <MobileScreenPreview />
      <EditPageForm />
    </View>
  );
};
const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

export default function App() {
  return (
    <Layout />
  );
}

