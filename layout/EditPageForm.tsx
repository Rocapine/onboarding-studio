import { View } from "@tamagui/core";
import { useSteps } from "../contexts/steps-context";
import { Accordion, Heading, Paragraph, Square, YStack } from "tamagui";
import { ChevronDown } from '@tamagui/lucide-icons'

export default function EditPageForm() {

  const { selectedStep } = useSteps();
  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="center">
      {selectedStep ? (
        <YStack gap="$4" width="$20">
          <Heading>{selectedStep.name}</Heading>
          <Accordion overflow="hidden" width="$20" type="multiple">
            <Accordion.Item value="a1">
              <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({
                  open,
                }: {
                  open: boolean
                }) => (
                  <>
                    <Paragraph>Type</Paragraph>
                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                      <ChevronDown size="$1" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.HeightAnimator animation="medium">
                <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                  <Paragraph>
                    {selectedStep.type}
                  </Paragraph>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>

            <Accordion.Item value="a2">
              <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({
                  open,
                }: {
                  open: boolean
                }) => (
                  <>
                    <Paragraph>Content</Paragraph>
                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                      <ChevronDown size="$1" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.HeightAnimator animation="medium">
                <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                  <Paragraph>
                    Eggs have been a dietary staple since time immemorial and there’s good
                    reason for their continued presence in our menus and meals.
                  </Paragraph>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          </Accordion>
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
