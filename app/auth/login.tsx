import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/supabase.client'
import { Stack } from 'tamagui'


export default function Login() {
  const [session, setSession] = useState<Session | null>(null)

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

  if (!session) {
    return (
      <Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </Stack>)
  }
  else {
    return (<div>Logged in!</div>)
  }
}