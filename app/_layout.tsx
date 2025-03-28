import { Provider } from '@/Provider';
import { supabase } from '@/supabase.client';
import { Link, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { Paragraph, PortalProvider, Stack, YStack } from 'tamagui';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setIsLoggedIn(true) }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) { setIsLoggedIn(true) }
    })

    return () => subscription.unsubscribe()
  }, [])
  return (
    <Provider>
      <PortalProvider shouldAddRootHost>
        <Stack style={{ flex: 1, flexDirection: 'row' }}>
          {/* Sidebar */}
          {isLoggedIn && <Stack
            backgroundColor={'$background'}
            padding={'$4'}
            borderRightWidth={1}
            borderRightColor={'$borderColor'}

          >
            <YStack gap={"$2"} >
              <Link href="/teams">
                <Paragraph >Teams</Paragraph>
              </Link>
              <Link href="/projects">
                <Paragraph >Projects</Paragraph>
              </Link>
            </YStack>
          </Stack>
          }
          {/* Main content */}
          <Stack style={{ flex: 1 }}>
            <Slot />
          </Stack>
        </Stack>
      </PortalProvider>
    </Provider >
  );
}