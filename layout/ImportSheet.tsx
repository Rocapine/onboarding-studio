import { useState } from 'react';
import { Button, TextArea, Sheet, Text, XStack, YStack } from 'tamagui';
import { useSteps } from '../contexts/steps-context';

export const ImportSheet = ({ open, setOpen, setSteps }: { open: boolean, setOpen: (open: boolean) => void, setSteps: (steps: OnboardingStep[]) => void }) => {
  const [jsonText, setJsonText] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);

  const handleSave = () => {
    try {
      const parsedJson = JSON.parse(jsonText);
      localStorage.setItem('onboardingSteps', JSON.stringify(parsedJson));
      setSteps(parsedJson);
      setOpen(false);
    } catch (error) {
      console.error('Invalid JSON:', error);
      setIsValidJson(false);
    }
  };

  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      JSON.parse(text);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
  };

  return (
    <Sheet modal open={open} onOpenChange={setOpen}>
      <Sheet.Overlay />
      <Sheet.Frame>
        <Sheet.ScrollView>
          <YStack flex={1} gap="$2">
            <TextArea
              value={jsonText}
              onChangeText={handleJsonChange}
              placeholder="Paste your JSON here"
            />
            <XStack justifyContent="center" alignItems="center" gap="$2">

              {!isValidJson ? <Text color="red">JSON: Invalid</Text> : <Text color="green">JSON: Valid</Text>}
              <Button onPress={handleSave} disabled={!isValidJson}>
                Import
              </Button>
            </XStack>
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};