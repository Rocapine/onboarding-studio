import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { TamaguiProvider, View } from '@tamagui/core'
import { tamaguiConfig } from './tamagui.config'
export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View flex={1} backgroundColor="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}

