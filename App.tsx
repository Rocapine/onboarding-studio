import "@expo/metro-runtime";
import { TamaguiProvider, View, useTheme, Theme } from '@tamagui/core'
import { tamaguiConfig } from './tamagui.config'
import EditPageForm from './layout/EditPageForm';
import StepsList from './layout/StepsList';
import MobileScreenPreview from "./layout/MobileScreenPreview";
import { useColorScheme } from "react-native";
import { StepsProvider } from "./contexts/steps-context";

const Layout = () => {
  const theme = useTheme();

  return (
    <View backgroundColor={"$background"} flex={1} flexDirection="row">
      <EditPageForm />
      <MobileScreenPreview />
      <StepsList />
    </View>
  );
};

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? "green" : "dark_green" // 'light' or 'dark'
  return (
    <TamaguiProvider config={tamaguiConfig} >
      <StepsProvider>
        <Theme name={theme} >
          <Layout />
        </Theme>
      </StepsProvider>
    </TamaguiProvider>
  );
}

