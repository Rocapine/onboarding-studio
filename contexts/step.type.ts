export enum StepType {
  MediaContent = "MediaContent",
  Question = "Question",
  Picker = "Picker",
}

type BaseStepProperties = {
  id: string;
  type: StepType;
  name: string;
  hideHeader: boolean;
  payload?: Record<string, any>;
};

export type HalfImageHalfContentStep = BaseStepProperties & {
  type: StepType.MediaContent;
  payload: {
    imageUrl: string;
    title: string;
    description: string;
  };
};

export type QuestionStep = BaseStepProperties & {
  type: StepType.Question;
  payload: {
    answers: string[];
    title: string;
  };
};
export type PickerStep = BaseStepProperties & {
  type: StepType.Picker;
  payload: {
    title: string;
  };
};

export type StepProperties =
  | HalfImageHalfContentStep
  | QuestionStep
  | PickerStep;

export const getInitialStepPayload = <T extends StepProperties>(
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