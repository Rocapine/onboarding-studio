import { SyncStatus } from "@/components/SyncStatus";
import { View } from "@tamagui/core";
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Checkbox, Heading, Input, Label, TextArea, XStack, YStack } from "tamagui";
import { SelectType } from "../components/SelectType";
import { useSteps } from "../contexts/steps-context";
import { CarouselEditor } from "../OnboardingSteps/Carousel/Carousel.form";
import { CustomScreenEditor } from "../OnboardingSteps/CustomScreen/CustomScreen.form";
import { MediaContentEditor } from "../OnboardingSteps/MediaContent/MediaContent.form";
import { PickerEditor } from "../OnboardingSteps/Picker/Picker.form";
import { QuestionEditor } from "../OnboardingSteps/Question/Question.form";
import { ReminderEditor } from "../OnboardingSteps/Reminder/Reminder.form";
import { getInitialStepPayload, OnboardingStep, STEP_TYPES, StepType } from "../OnboardingSteps/step.type";


export default function EditPageForm() {
  const { selectedStep, setStep, syncStepsStatus } = useSteps();

  return (
    <EditStepForm key={selectedStep.id} selectedStep={selectedStep} setStep={setStep} syncStepsStatus={syncStepsStatus} />
  )
}

const EditStepForm = ({ selectedStep, setStep, syncStepsStatus }: { selectedStep: OnboardingStep, setStep: (id: string, updatedStep: OnboardingStep) => void, syncStepsStatus: "idle" | "pending" | "error" | "success" | undefined }) => {
  const [customPayloadString, setCustomPayloadString] = useState<string>(JSON.stringify(selectedStep.customPayload, null, 2));
  const [isValidCustomPayloadString, setIsValidCustomPayloadString] = useState<boolean>(true);

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

  const validateContent = (value: string) => {
    setCustomPayloadString(value);
    try {
      const parsedValue = JSON.parse(value);
      updateStep({ ...selectedStep, customPayload: parsedValue });
      setIsValidCustomPayloadString(true);
    } catch (error) {
      console.error(error);
      setIsValidCustomPayloadString(false);
    }
  };

  const editor = React.useMemo(() => {
    switch (selectedStep?.type) {
      case STEP_TYPES.MediaContent: return <MediaContentEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Question: return <QuestionEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.CustomScreen: return <CustomScreenEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Picker: return <PickerEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Carousel: return <CarouselEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      case STEP_TYPES.Reminder: return <ReminderEditor key={selectedStep.id} updateStep={updateStep} step={selectedStep} />
      default: return null
    }
  }, [selectedStep, updateStep])


  return (
    <View key={selectedStep.id} flex={1} alignItems="center" justifyContent="flex-start">
      {selectedStep ? (
        <YStack flex={1} width={"100%"} gap="$2" padding={"$4"} overflow="scroll" scrollbarWidth={"none"}>
          <XStack justifyContent="space-between" alignItems="center" width="100%" gap="$2">
            <Input
              value={selectedStep.name}
              onChange={handleNameChange}
              placeholder="Enter step name"
              lineHeight={1.2 * 24}
              style={{ minHeight: 48, height: 48, fontSize: 24, fontWeight: 'bold', borderColor: 'transparent', borderRadius: 0, borderWidth: 0, padding: 0, backgroundColor: 'transparent' }} // Apply heading styles
            />
            {syncStepsStatus && <SyncStatus syncStatus={syncStepsStatus} size={24} />}
          </XStack>
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
          <Label>Custom Payload <Label color={isValidCustomPayloadString ? 'green' : 'red'}>{isValidCustomPayloadString ? 'Valid' : 'Invalid'}</Label></Label>
          <TextArea
            minHeight={100}
            placeholder="Enter custom payload as JSON"
            value={customPayloadString}
            onChangeText={validateContent}
            // @ts-ignore
            style={{ resize: 'vertical' }}
          />
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
