import { View } from "@tamagui/core";
import { H3, Theme } from "tamagui";
import { useSteps } from "../contexts/steps-context";
import { Paragraph } from "tamagui";
import { IPhoneFrame, IPhoneModel } from "../components/iPhone";
import React from "react";
import { SelectModel } from "../components/SelectModel";
import { IPhoneProvider, useIPhoneContext } from "../contexts/iphone-context";

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
          <View>
            <H3>{selectedStep?.type}</H3 >
            <Paragraph color={"$pink"}>{selectedStep?.name}</Paragraph>
          </View>
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