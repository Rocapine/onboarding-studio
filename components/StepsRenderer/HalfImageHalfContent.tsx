import { YStack, Text, Image, XStack, Stack, Button, Paragraph } from "tamagui";
import { Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight } from "@tamagui/lucide-icons";
import { HalfImageHalfContentStep } from "../../contexts/step.type";

type ContentProps = {
  step: HalfImageHalfContentStep;
};

export const Content = ({ step }: ContentProps) => {
  const question = step.payload;
  const { bottom } = useSafeAreaInsets();
  const { height } = Dimensions.get("window");
  let imageHeight = height - 320 - bottom;
  if (!question.image) {
    imageHeight += 60;
  }

  const goNext = () => {
    console.log("goNext");
  };

  return (
    <YStack flex={1}>
      {question.image ? (
        <Image
          source={{ uri: question.image }}
          alignSelf="center"
          width="100%"
          height={imageHeight}
          objectFit="cover"
        />
      ) : (
        <LottieView
          source={question.lottie}
          autoPlay
          loop={false}
          style={{
            alignSelf: "center",
            width: "100%",
            height: imageHeight,
          }}
          resizeMode="cover"
        />
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
          <Text
            fontSize={18}
            fontWeight="400"
            color={"#9a9a9a"}
            textAlign="center"
            fontFamily={"$body"}
          >
            {question.content}
          </Text>
        </Stack>
        <Stack>
          <Button onPress={() => goNext()}>
            <XStack justifyContent="center" alignItems="center" gap="$2.5">
              <Paragraph fontWeight="600">
                {question.buttonText ? question.buttonText : "Next"}
              </Paragraph>
              <ChevronRight size={23} color={"$white"} />
            </XStack>
          </Button>
        </Stack>
      </YStack>
    </YStack>
  );
};
