import { Provider } from '@/Provider';
import { Slot } from 'expo-router';
import { PortalProvider } from 'tamagui';

export default function RootLayout() {
  return (
    <Provider>
      <PortalProvider shouldAddRootHost>
        <Slot />
      </PortalProvider>
    </Provider>
  );
}