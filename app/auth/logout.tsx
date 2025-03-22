import { supabase } from "@/supabase.client";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Paragraph, Stack } from "tamagui";

export default function Logout() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState()
  const navigatorReady = rootNavigationState?.key != null

  useEffect(() => {
    if (!navigatorReady) {
      return;
    }
    supabase.auth.signOut().then(() => {
      router.push("/");
    })
  }, [navigatorReady]);
  return (<Stack flex={1} backgroundColor={"$background"} justifyContent="center" alignItems="center"><Paragraph>Logging out</Paragraph></Stack>)

}