import { YStack, Text, Image, XStack, Stack, View } from "tamagui";
import { MediaContentStepType } from "../../contexts/step.type";
import { useIPhoneContext } from "../../contexts/iphone-context";
import { Button } from "../../components/Lib/Button";

type ContentProps = {
  step: MediaContentStepType;
};

export const MediaContentStep = ({ step }: ContentProps) => {
  const { useSafeAreaInsets, Dimensions } = useIPhoneContext();
  const question = step.payload;
  const { bottom } = useSafeAreaInsets();
  const { height } = Dimensions.get("window");
  let imageHeight = height - 320 - bottom;
  if (!question.image) {
    imageHeight += 60;
  }

  const goNext = () => { };

  return (
    <YStack flex={1}>
      {question.imageUrl ? (
        <Image
          source={{ uri: question.imageUrl }}
          alignSelf="center"
          width="100%"
          height={"50%"}
          objectFit="cover"
        />
      ) : (
        <View width="100%" height={"50%"} backgroundColor="green" />
      )}
      <YStack
        flex={1}
        alignItems="center"
        backgroundColor={"white"}
        justifyContent="space-between"
        marginTop="$-5"
        paddingHorizontal="$5"
        paddingTop={40}
        paddingBottom={bottom + 24}
        borderTopLeftRadius="$9"
        borderTopRightRadius="$9"
        elevation={5}
      >
        <YStack gap={"$3.5"} marginHorizontal="$4">
          {question.icon && (
            <Image
              source={{ uri: question.icon }}
              width={60}
              height={60}
              alignSelf="center"
              resizeMode="cover"
            />
          )}
          <Stack>
            <Text
              fontSize={"$9"}
              fontWeight="700"
              textAlign="center"
              color="#333"
              fontFamily={"$heading"}
            >
              {question.title}
            </Text>
          </Stack>
        </YStack>
        <Stack flex={1} justifyContent="center" maxWidth={340}>
          {step.payload.socialProof?.content && <SocialProof socialProof={step.payload.socialProof} />}
          <Text
            fontSize={18}
            fontWeight="400"
            color={"#9a9a9a"}
            textAlign="center"
            fontFamily={"$body"}
          >
            {question.description}
          </Text>
        </Stack>
        <Stack>
          <Button goNext={goNext} text={question.buttonText ? question.buttonText : "Next"} />
        </Stack>
      </YStack>
    </YStack>
  );
};


const SocialProof = ({ socialProof }: { socialProof: MediaContentStepType['payload']['socialProof'] }) => {
  return <View borderRadius={16} padding={16} backgroundColor={"$accentBackground"} alignItems="center">
    <XStack><Text>⭐️⭐️⭐️⭐️⭐️</Text></XStack>
    <Text
      textAlign="center"
      fontFamily="$body"
      fontSize={10}
      fontStyle="normal"
      fontWeight={600}
      lineHeight="130%"
    >{socialProof?.content}</Text>
    <Text>{socialProof?.authorName}</Text>
  </View >
}