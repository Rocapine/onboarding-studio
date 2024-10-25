import { View } from "@tamagui/core";
import { useSteps } from "../contexts/steps-context";
import { Heading, Input, TextArea, YStack } from "tamagui";
import React from "react";
import { SelectType } from "../components/SelectType";
import { getInitialStepPayload, StepProperties, StepType } from "../contexts/step.type";
import { MediaContentEditor } from "../OnboardingSteps/MediaContent/MediaContent.form";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";


export default function EditPageForm() {

  const { selectedStep, setStep } = useSteps();

  const setSelectedType = React.useCallback((type: StepType) => {
    if (selectedStep) {
      const initialPayload = getInitialStepPayload(type)
      setStep(selectedStep.id, { ...selectedStep, type, payload: initialPayload, } as StepProperties);
    }
  }, [selectedStep, setStep]);

  const handleNameChange = React.useCallback((event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (selectedStep) {
      const textWithoutNewLine = event.nativeEvent.text.replace(/\n/g, '');
      setStep(selectedStep.id, { ...selectedStep, name: textWithoutNewLine });
    }
  }, [selectedStep, setStep]);

  const updateStep = React.useCallback((step: StepProperties) => {
    setStep(selectedStep.id, step)
  }, [selectedStep, setStep])

  const editor = React.useMemo(() => {
    switch (selectedStep?.type) {
      case StepType.MediaContent: return <MediaContentEditor updateStep={updateStep} step={selectedStep} />
      default: return null
    }
  }, [selectedStep?.type])

  return (
    <View flex={1} flexGrow={1} padding={"$4"} alignItems="center" justifyContent="flex-start">
      {selectedStep ? (
        <YStack flex={1} width={"100%"} gap="$2">
          <TextArea
            value={selectedStep.name}
            onChange={handleNameChange}
            placeholder="Enter step name"
            lineHeight={1.2 * 24}
            style={{ fontSize: 24, fontWeight: 'bold', borderColor: 'transparent', borderWidth: 0, padding: 0, backgroundColor: 'transparent' }} // Apply heading styles
          />
          <SelectType selectedType={selectedStep.type} setSelectedType={setSelectedType} />
          {editor}
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
