import { Stack } from "tamagui"
import { useIPhoneContext } from "../../contexts/iphone-context";

export const IPhoneSafeArea = ({ children }: { children: React.ReactNode }) => {
  const { useSafeAreaInsets } = useIPhoneContext();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Stack flex={1} paddingTop={top} paddingBottom={bottom}>
      {children}
    </Stack>
  )
}