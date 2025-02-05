import { View } from "@tamagui/core";
import { useSteps } from "../contexts/steps-context";
import { Checkbox, Heading, Label, TextArea, XStack, YStack } from "tamagui";
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import React from "react";
import { SelectType } from "../components/SelectType";
import { getInitialStepPayload, OnboardingStep, StepType, STEP_TYPES } from "../OnboardingSteps/step.type";
import { MediaContentEditor } from "../OnboardingSteps/MediaContent/MediaContent.form";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { QuestionEditor } from "../OnboardingSteps/Question/Question.form";
import { CustomScreenEditor } from "../OnboardingSteps/CustomScreen/CustomScreen.form";
import { PickerEditor } from "../OnboardingSteps/Picker/Picker.form";


export default function EditPageForm() {

  const { selectedStep, setStep } = useSteps();

  const setSelectedType = React.useCallback((type: StepType) => {
    if (selectedStep) {
      const initialPayload = getInitialStepPayload(type)
      setStep(selectedStep.id, { ...selectedStep, type, payload: initialPayload, } as OnboardingStep);
    }
  }, [selectedStep, setStep]);

  const handleNameChange = React.useCallback((event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (selectedStep) {
      const textWithoutNewLine = event.nativeEvent.text.replace(/\n/g, '');
      setStep(selectedStep.id, { ...selectedStep, name: textWithoutNewLine });
    }
  }, [selectedStep, setStep]);

  const updateStep = React.useCallback((step: OnboardingStep) => {
    setStep(selectedStep.id, step)
  }, [selectedStep, setStep])

  const editor = React.useMemo(() => {
    switch (selectedStep?.type) {
      case STEP_TYPES.MediaContent: return <MediaContentEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Question: return <QuestionEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.CustomScreen: return <CustomScreenEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Picker: return <PickerEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      default: return null
    }
  }, [selectedStep])

  return (
    <View key={selectedStep.id} flex={1} padding={"$4"} alignItems="center" justifyContent="flex-start">
      {selectedStep ? (
        <YStack flex={1} width={"100%"} gap="$2" overflow="scroll">
          <TextArea
            value={selectedStep.name}
            onChange={handleNameChange}
            placeholder="Enter step name"
            lineHeight={1.2 * 24}
            style={{ minHeight: 48, height: 48, fontSize: 24, fontWeight: 'bold', borderColor: 'transparent', borderRadius: 0, borderWidth: 0, padding: 0, backgroundColor: 'transparent' }} // Apply heading styles
          />
          <SelectType selectedType={selectedStep.type} setSelectedType={setSelectedType} />
          <XStack justifyContent="space-between" alignItems="center" width="100%">
            <Label>Display progress in header</Label>
            <Checkbox
              checked={selectedStep.displayProgressHeader}
              onCheckedChange={(checked) => updateStep({ ...selectedStep, displayProgressHeader: typeof checked === 'boolean' ? checked : false })}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox>
          </XStack>
          {editor}
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
