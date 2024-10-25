import { Sheet, Button, Input } from "tamagui"
import React from "react"
import { ChevronDown } from "@tamagui/lucide-icons"

export const ExportSheet = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [position, setPosition] = React.useState(0)

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPointsMode={"fit"}
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5" backgroundColor={"black"}>
        <Button size="$6" circular icon={ChevronDown} onPress={() => setOpen(false)} />
        <Input width={200} />

      </Sheet.Frame>
    </Sheet>
  )
}
