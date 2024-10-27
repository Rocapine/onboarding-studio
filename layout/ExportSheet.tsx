import { Sheet, ScrollView, Button } from "tamagui"
import React from "react"

const syntaxHighlight = (json: string) => {
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|(\b(true|false|null)\b)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
};

// Add CSS styles for JSON syntax highlighting
const styles = `
.key { color: #d73a49; } /* Red for keys */
.string { color: #032f62; } /* Blue for strings */
.number { color: #005cc5; } /* Dark blue for numbers */
.boolean { color: #d73a49; } /* Red for booleans */
.null { color: #6f42c1; } /* Purple for null */
`;

export const ExportSheet = ({ open, setOpen, getJsonSteps }: { open: boolean, setOpen: (open: boolean) => void, getJsonSteps: () => string }) => {
  const [position, setPosition] = React.useState(0)
  const jsonSteps = getJsonSteps();
  const [buttonLabel, setButtonLabel] = React.useState("Copy JSON");


  // Function to copy jsonSteps to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonSteps).then(() => {
      console.log('JSON steps copied to clipboard');
      setButtonLabel("Copied to clipboard");
      setTimeout(() => setButtonLabel("Copy JSON"), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Inject styles into the document
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

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
        <Button onPress={copyToClipboard}>{buttonLabel}</Button>
        <ScrollView height={"100%"} width={"100%"} backgroundColor={"$background"} >
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonSteps) }} />
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
