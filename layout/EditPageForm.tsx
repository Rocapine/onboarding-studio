import { View } from "@tamagui/core";
import { StepType, useSteps } from "../contexts/steps-context";
import { Heading, YStack } from "tamagui";
import React from "react";
import { SelectType } from "../components/SelectType";


export default function EditPageForm() {

  const { selectedStep, setStep } = useSteps();

  const setSelectedType = (type: StepType) => {
    if (selectedStep) {
      setStep(selectedStep.id, { ...selectedStep, type });
    }
  }

  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="center">
      {selectedStep ? (
        <YStack gap="$4" width="$20">
          <Heading>{selectedStep.name}</Heading>
          <SelectType selectedType={selectedStep.type} setSelectedType={setSelectedType} />
        </YStack>
      ) : <Heading width="$20">No step selected</Heading>}
    </View>
  );
}
