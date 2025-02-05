const MediaContent = "MediaContent";
const Question = "Question";
const Picker = "Picker";
const CustomScreen = "CustomScreen";
const Carousel = "Carousel";

export const STEP_TYPES = {
  MediaContent,
  Question,
  Picker,
  CustomScreen,
  Carousel,
} as const;

type BaseStepProperties = {
  id: string;
  type:
    | typeof MediaContent
    | typeof Question
    | typeof Picker
    | typeof CustomScreen
    | typeof Carousel;
  name: string;
  displayProgressHeader: boolean;
  payload?: Record<string, any>;
};

export type StepType = BaseStepProperties["type"];

export type MediaContentStepType = BaseStepProperties & {
  type: typeof MediaContent;
  payload: {
    imageUrl: string;
    title: string;
    description: string;
    socialProof?: {
      numberOfStar: number;
      content: string;
      authorName: string;
    };
  };
};

export type Answer = {
  label: string;
  value: string;
  icon?: string;
};

export type QuestionStepType = BaseStepProperties & {
  type: typeof Question;
  payload: {
    answers: Answer[];
    title: string;
    subtitle?: string;
    multipleAnswer: boolean;
    infoBox?: {
      title: string;
      content: string;
    };
  };
};

export enum PickerType {
  Height = "height",
  Weight = "weight",
  Age = "age",
  Gender = "gender",
  Coach = "coach",
  Name = "name",
}

export type PickerStepType = BaseStepProperties & {
  type: typeof Picker;
  payload: {
    title: string;
    description?: string;
    pickerType: PickerType;
  };
};

export type CustomScreenStepType = BaseStepProperties & {
  type: typeof CustomScreen;
  payload: {
    customScreenId: string;
    type: string;
    content: object;
  };
};

export type CarouselStepType = BaseStepProperties & {
  type: typeof Carousel;
  payload: {
    screens: Array<{ mediaUrl: string; title: string; subtitle: string }>;
  };
};

export type OnboardingStep =
  | MediaContentStepType
  | QuestionStepType
  | PickerStepType
  | CustomScreenStepType
  | CarouselStepType;

export const getInitialStepPayload = <T extends OnboardingStep>(
  type: T["type"]
): T["payload"] => {
  if (type === Question) {
    return {
      answers: [],
      title: "",
      multipleAnswer: false,
    };
  }
  if (type === MediaContent) {
    return {
      imageUrl: "https://api-ninjas.com/images/cats/abyssinian.jpg",
      title: "Hello",
      description: "World",
    };
  }
  if (type === Picker) {
    return {
      title: "What is your height?",
      description: "",
      pickerType: PickerType.Height,
    };
  }
  if (type === Carousel) {
    return {
      screens: [
        {
          mediaUrl: "https://api-ninjas.com/images/cats/abyssinian.jpg",
          title: "Écran 1",
          subtitle: "Sous titre 1",
        },
        {
          mediaUrl:
            "https://f360-cdn.rocapine.io/rive/Onboarding%20-%20Storytelling%20Part1.riv",
          title: "Écran 2",
          subtitle: "Sous titre 2",
        },
      ],
    };
  }
  return {} as T["payload"];
};
