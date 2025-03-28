import { supabase } from '@/supabase.client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session } from '@supabase/supabase-js'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, H1, Paragraph, Stack, XStack } from 'tamagui'


export default function Login() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      router.push('/projects')
    }
  }, [session, router])

  if (!session) {
    return (
      <XStack flex={1} backgroundColor={"$background"}>
        <Stack flex={1} justifyContent="center" alignItems="center" >
          <Auth supabaseClient={supabase} theme="dark" appearance={{ theme: ThemeSupa }} providers={["github"]} />
        </Stack>
        <Stack flex={1} gap={"$2"} justifyContent="center" alignItems="center">
          <H1>Welcome to Supabase</H1>
          <Link href="/offline">
            <Button size="$4" backgroundColor={"$background"} color={"$color"} width={200} height={50} borderRadius={10}>
              Offline Mode
            </Button>
          </Link>
        </Stack>
      </XStack>)
  }
  else {
    return (<Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center"><Paragraph>Logged In</Paragraph></Stack>)
  }
}