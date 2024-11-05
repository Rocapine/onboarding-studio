const MediaContent = "MediaContent";
const Question = "Question";
const Picker = "Picker";
export const StepType = {
  MediaContent,
  Question,
  Picker,
} as const;

type BaseStepProperties = {
  id: string;
  type: typeof MediaContent | typeof Question | typeof Picker;
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
    multipleAnswer: boolean;
    infoBox?: {
      title: string;
      content: string;
    };
  };
};
export type PickerStepType = BaseStepProperties & {
  type: typeof Picker;
  payload: {
    title: string;
  };
};

export type OnboardingStep =
  | MediaContentStepType
  | QuestionStepType
  | PickerStepType;

export const getInitialStepPayload = <T extends OnboardingStep>(
  type: T["type"]
): T["payload"] => {
  if (type === Question) {
    return {
      answers: [],
      title: "",
    };
  }
  if (type === MediaContent) {
    return {
      imageUrl: "https://api-ninjas.com/images/cats/abyssinian.jpg",
      title: "Hello",
      description: "World",
    };
  }
  return {} as T["payload"];
};
