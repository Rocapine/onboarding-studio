export enum StepType {
  MediaContent = "MediaContent",
  Question = "Question",
  Picker = "Picker",
}

type BaseStepProperties = {
  id: string;
  type: StepType;
  name: string;
  displayProgressHeader: boolean;
  payload?: Record<string, any>;
};

export type MediaContentStepType = BaseStepProperties & {
  type: StepType.MediaContent;
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
  type: StepType.Question;
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
  type: StepType.Picker;
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
  if (type === StepType.Question) {
    return {
      answers: [],
      title: "",
    };
  }
  if (type === StepType.MediaContent) {
    return {
      imageUrl: "https://api-ninjas.com/images/cats/abyssinian.jpg",
      title: "Hello",
      description: "World",
    };
  }
  return {} as T["payload"];
};
