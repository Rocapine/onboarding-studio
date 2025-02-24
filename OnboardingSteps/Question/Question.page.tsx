import { Heading, Stack, styled, YStack, Text, View, Progress, XStack } from "tamagui"
import { QuestionStepType } from "../step.type"
import { useState } from "react";
import { IPhoneSafeArea } from "../../components/StepsRenderer/SafeArea";
import { Button } from "../../components/Lib/Button";
import { MessageCircleQuestion } from "@tamagui/lucide-icons";
import { infoBoxIsDefined } from "./Question.helpers";

export const QuestionPage = ({ step }: { step: QuestionStepType }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleContinue = async () => {

  };

  const toggleSelected = (answer: string) => {
    const isNoneOfTheAbove = answer === "None of the above";

    setSelected((prev) => {
      if (step.payload.multipleAnswer) {
        let newSelected: Record<string, boolean>;

        if (isNoneOfTheAbove) {
          newSelected = { [answer]: true };
        } else {
          newSelected = { ...prev, [answer]: !prev[answer] };

          if (newSelected["None of the above"]) {
            newSelected["None of the above"] = false;
          }
        }

        return newSelected;
      } else {
        return { [answer]: true }
      }
    });
  };


  return (
    <IPhoneSafeArea>
      <YStack
        gap="$4"
        flex={1}
        paddingHorizontal="$5"
        paddingTop="$5"
        paddingBottom="$5"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}
      >
        {step.displayProgressHeader && <ProgressBar />}
        {step.payload.title && <Heading fontSize="$8" fontWeight={700}>
          {step.payload.title}
        </Heading>}
        {step.payload.subtitle && <Heading fontSize="$5" fontWeight={400}>
          {step.payload.subtitle}
        </Heading>}
        <InfoBox infoBox={step.payload.infoBox} />
        <YStack width={"100%"} flex={1} justifyContent="space-evenly">
          <YStack gap="$3">
            {step.payload.answers.map((answer, index) => (
              <ButtonFrame
                key={index}
                onPress={() => toggleSelected(answer.value)}
                isSelected={!!selected[answer.value]}
              >
                <ButtonText
                  isSelected={!!selected[answer.value]}
                  fontSize="$5"
                  paddingHorizontal="$2.5"
                >
                  {answer.label}
                </ButtonText>
              </ButtonFrame>
            ))}
          </YStack>
        </YStack>
        <Stack>
          <Button goNext={handleContinue} text={"Next"} />
        </Stack>
      </YStack>
    </IPhoneSafeArea>
  )
}

const ProgressBar = () => (
  <View width={"70%"} justifyContent="center" alignItems="center">
    <Progress
      value={70}
      height={6}
      backgroundColor={"$accentBackground"}
    >
      <Progress.Indicator
        backgroundColor={"$accentColor"}
        animation="100ms"
      />
    </Progress>
  </View>
)

const InfoBox = ({ infoBox }: { infoBox: QuestionStepType['payload']['infoBox'] }) => {
  if (!infoBoxIsDefined(infoBox)) return null
  return (
    <YStack gap="$2" borderRadius={"$2"} borderWidth={"$1"} borderColor={"$borderColor"} backgroundColor={"white"} padding="$2">
      {infoBox.title && <XStack alignItems="center" gap="$2">
        <MessageCircleQuestion />
        <Text>{infoBox.title}</Text>
      </XStack>}
      {infoBox.content && <Text>{infoBox.content}</Text>}
    </YStack>
  )
}

const ButtonFrame = styled(View, {
  padding: "$4",
  backgroundColor: '$background',
  borderRadius: 30,
  width: "100%",
  borderColor: "$bakgroundPress",
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: '$backgroundPress',
        pressStyle: {
          backgroundColor: '$background',
        },
      },
    },
  },
});

const ButtonText = styled(Text, {
  fontWeight: 400,
  fontSize: 18,
  lineHeight: 24,
  color: '$color',
  variants: {
    isSelected: {
      true: { color: '$colorPress' },
    },
  },
});
