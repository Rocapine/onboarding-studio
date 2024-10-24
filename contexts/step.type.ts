export enum StepType {
  HalfImageHalfContent = "Half Image Half Content",
  Question = "Question",
}

type BaseStepProperties = {
  id: string;
  type: StepType;
  name: string;
  hideHeader: boolean;
  payload?: Record<string, any>;
};

export type HalfImageHalfContentStep = BaseStepProperties & {
  type: StepType.HalfImageHalfContent;
  payload: {
    image: string;
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

export type StepProperties = HalfImageHalfContentStep | QuestionStep;
