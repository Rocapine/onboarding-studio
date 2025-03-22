import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/supabase.client'
import { H1, Paragraph, Stack } from 'tamagui'
import { useRouter } from 'expo-router'


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
  }, [session])

  if (!session) {
    return (
      <Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </Stack>)
  }
  else {
    return (<Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center"><Paragraph>Logged In</Paragraph></Stack>)
  }
}