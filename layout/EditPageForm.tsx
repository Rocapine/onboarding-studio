import { View } from "@tamagui/core";
import { useSteps } from "../contexts/steps-context";
import { Heading, YStack } from "tamagui";
import React from "react";
import { SelectType } from "../components/SelectType";
import { getInitialStepPayload, StepProperties, StepType } from "../contexts/step.type";


export default function EditPageForm() {

  const { selectedStep, setStep } = useSteps();

  const setSelectedType = React.useCallback((type: StepType) => {
    if (selectedStep) {
      const initialPayload = getInitialStepPayload(type)
      setStep(selectedStep.id, { ...selectedStep, type, payload: initialPayload, } as StepProperties);
    }
  }, [selectedStep, setStep]);

  return (
    <View flex={1} padding={"$4"} alignItems="center" justifyContent="flex-start">
      {selectedStep ? (
        <YStack gap="$4" width="$20">
          <Heading>{selectedStep.name}</Heading>
          <SelectType selectedType={selectedStep.type} setSelectedType={setSelectedType} />
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
