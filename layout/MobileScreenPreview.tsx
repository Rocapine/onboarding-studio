import { View, Text } from "@tamagui/core";
import { H3, Theme } from "tamagui";
import { useSteps } from "../contexts/steps-context";
import { Paragraph } from "tamagui";
import { IPhoneFrame, IPhoneModel } from "../components/iPhone";
import { useState } from "react";
import { SelectModel } from "../components/SelectModel";

export default function MobileScreenPreview() {
  const { selectedStep } = useSteps();
  const [selectedModel, setSelectedModel] = useState<IPhoneModel>(IPhoneModel.iPhone15);

  const handleModelChange = (value: string) => {
    setSelectedModel(value as IPhoneModel);
  };

  return (
    <View flex={1} padding={20} alignItems="center" justifyContent="space-around" backgroundColor={"$accentBackground"}>
      <SelectModel selectedModel={selectedModel} handleModelChange={handleModelChange} />
      <Theme name="light">
        <IPhoneFrame model={selectedModel} >
          <View>
            <H3>{selectedStep?.type}</H3 >
            <Paragraph color={"$pink"}>{selectedStep?.name}</Paragraph>
          </View>
        </IPhoneFrame>
      </Theme>
    </View>
  );
}
