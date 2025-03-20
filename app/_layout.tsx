import { Provider } from '@/Provider';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}