import { View } from "@tamagui/core";
import { Theme } from "tamagui";
import { useSteps } from "../contexts/steps-context";
import { IPhoneFrame, IPhoneModel } from "../components/iPhone";
import React from "react";
import { SelectModel } from "../components/SelectModel";
import { IPhoneProvider, useIPhoneContext } from "../contexts/iphone-context";
import { StepsRenderer } from "../components/StepsRenderer/StepsRenderer";

function MobileScreenPreview() {
  const { selectedStep } = useSteps();

  const { iphoneModel, setIphoneModel } = useIPhoneContext();

  const handleModelChange = (value: string) => {
    setIphoneModel(value as IPhoneModel);
  };

  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="space-around" backgroundColor={"$accentBackground"}>
      <SelectModel selectedModel={iphoneModel} handleModelChange={handleModelChange} />
      <Theme name="light">
        <IPhoneFrame model={iphoneModel} >
          {selectedStep && <StepsRenderer step={selectedStep} />}
        </IPhoneFrame>
      </Theme>
    </View>
  );
}

export default function MobileScreenPreviewWithProvider() {
  return (
    <IPhoneProvider>
      <MobileScreenPreview />
    </IPhoneProvider>
  );
}