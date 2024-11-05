import { OnboardingStep } from "./step.type";

export const exportSteps = (steps: OnboardingStep[]) => {
  const json = JSON.stringify(steps);
  return json;
};
