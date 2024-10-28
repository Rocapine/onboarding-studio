import { ChevronRight } from "@tamagui/lucide-icons";
import { Button as TamaguiButton, Paragraph, XStack } from "tamagui";

export const Button = ({ goNext, text }: { goNext: () => void, text: string }) => {
  return (
    <TamaguiButton onPress={() => goNext()}>
      <XStack justifyContent="center" alignItems="center" gap="$2.5">
        <Paragraph fontWeight="600">
          {text}
        </Paragraph>
        <ChevronRight size={23} color={"$white"} />
      </XStack>
    </TamaguiButton>
  )
}