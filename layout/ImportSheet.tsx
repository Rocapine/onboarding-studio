import { useState } from 'react';
import { Button, TextArea, Sheet, Text, XStack, YStack } from 'tamagui';
import { useSteps } from '../contexts/steps-context';
import { OnboardingStep } from '../OnboardingSteps/step.type';

const assertHasUniqueIds = (steps: OnboardingStep[]) => {
  const ids = steps.map(step => step.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== steps.length) {
    throw new Error("Steps must have unique IDs");
  }
}


export const ImportSheet = ({ open, setOpen, setSteps }: { open: boolean, setOpen: (open: boolean) => void, setSteps: (steps: OnboardingStep[]) => void }) => {
  const [jsonText, setJsonText] = useState('');
  const [parseJsonError, setParseJsonError] = useState<string | null>(null);

  const handleSave = () => {
    try {
      const parsedJson = JSON.parse(jsonText);
      localStorage.setItem('onboardingSteps', JSON.stringify(parsedJson));
      setSteps(parsedJson);
      setOpen(false);
    } catch (error: any) {
      console.error('Invalid JSON:', error);
      setParseJsonError(error.message || "Unknown error");
    }
  };

  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      JSON.parse(text);
      assertHasUniqueIds(JSON.parse(text));
      setParseJsonError(null);
    } catch (error: any) {
      setParseJsonError(error.message || "Unknown error");
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

              {parseJsonError ? <Text color="red">JSON Invalid: {parseJsonError}</Text> : <Text color="green">JSON Valid</Text>}
              <Button onPress={handleSave} disabled={!!parseJsonError}>
                Import
              </Button>
            </XStack>
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};