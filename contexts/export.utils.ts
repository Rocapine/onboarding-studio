import { OnboardingStep } from "../OnboardingSteps/step.type";

export const exportSteps = (steps: OnboardingStep[]) => {
  const json = JSON.stringify(steps);
  return json;
};
