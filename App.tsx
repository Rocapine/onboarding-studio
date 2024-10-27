import "@expo/metro-runtime";
import { TamaguiProvider, View, Theme } from '@tamagui/core'
import { tamaguiConfig } from './tamagui.config'
import EditPageForm from './layout/EditPageForm';
import StepsList from './layout/StepsList';
import MobileScreenPreview from "./layout/MobileScreenPreview";
import { useColorScheme } from "react-native";
import { StepsProvider } from "./contexts/steps-context";
import { Toast, ToastProvider, ToastViewport, useToastState } from "@tamagui/toast";
import { YStack } from "tamagui";

const Layout = () => {
  return (
    <View backgroundColor={"$background"} flex={1} flexDirection="row">
      <ToastViewport />
      <CurrentToast />
      <EditPageForm />
      <MobileScreenPreview />
      <StepsList />
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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? "green" : "dark_green" // 'light' or 'dark'
  return (
    <TamaguiProvider config={tamaguiConfig} >
      <StepsProvider>
        <Theme name={theme} >
          <ToastProvider>
            <Layout />
          </ToastProvider>
        </Theme>
      </StepsProvider>
    </TamaguiProvider>
  );
}

