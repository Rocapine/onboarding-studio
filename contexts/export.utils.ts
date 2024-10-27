import { StepProperties } from "./step.type";

export const exportSteps = (steps: StepProperties[]) => {
  const json = JSON.stringify(steps);
  return json;
};
