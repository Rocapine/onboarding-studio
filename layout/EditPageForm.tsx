import { View } from "@tamagui/core";
import { StepType, useSteps } from "../contexts/steps-context";
import { Accordion, Heading, Paragraph, Select, Square, YStack } from "tamagui";
import { Check, ChevronDown } from '@tamagui/lucide-icons'
import React from "react";
import { SelectType } from "../components/SelectType";


export default function EditPageForm() {

  const { selectedStep, setStep } = useSteps();
  console.log("selectedStep", selectedStep);

  const setSelectedType = (type: StepType) => {
    console.log("setSelectedType", type);
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
