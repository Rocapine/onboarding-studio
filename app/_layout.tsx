import { Provider } from '@/Provider';
import { Slot, useRootNavigationState } from 'expo-router';

export default function RootLayout() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}