import { Sheet, Button, Input, View, Paragraph } from "tamagui"
import React from "react"
import { ChevronDown } from "@tamagui/lucide-icons"

export const ExportSheet = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [position, setPosition] = React.useState(0)
  const jsonString = "{\"users\":[{\"id\":1,\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":{\"street\":\"123 Main St\",\"city\":\"Anytown\",\"state\":\"CA\",\"zip\":\"12345\"},\"posts\":[{\"id\":101,\"title\":\"My First Post\",\"content\":\"This is the content of my first post.\"},{\"id\":102,\"title\":\"Another Post\",\"content\":\"This is some more content.\"}]},{\"id\":2,\"name\":\"Jane Smith\",\"email\":\"jane.smith@example.com\",\"address\":{\"street\":\"456 Elm St\",\"city\":\"Othertown\",\"state\":\"NY\",\"zip\":\"67890\"},\"posts\":[{\"id\":103,\"title\":\"Hello World\",\"content\":\"Hello, this is Jane!\"}]},{\"id\":3,\"name\":\"Alice Johnson\",\"email\":\"alice.johnson@example.com\",\"address\":{\"street\":\"789 Oak St\",\"city\":\"Sometown\",\"state\":\"TX\",\"zip\":\"11223\"},\"posts\":[{\"id\":104,\""
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
        <View height={"100%"} width={"100%"} backgroundColor={"white"} >
          <Paragraph height={"100%"} >UN FAUX JSON</Paragraph>
          <Paragraph height={"100%"} >{jsonString}</Paragraph>
        </View>
      </Sheet.Frame>
    </Sheet>
  )
}
