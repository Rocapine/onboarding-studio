import { createContext, useContext, useState, ReactNode } from 'react';

export enum StepType {
  Question = 'Question',
  ValueProposition = 'Value Proposition',
  Feature = 'Feature',
}

export type StepProperties = {
  id: string;
  type: StepType;
  name: string;
};

type StepsContextType = {
  steps: StepProperties[];
  addStep: (step: StepProperties) => void;
  setStep: (id: StepProperties['id'], updatedStep: StepProperties) => void;
  setSteps: React.Dispatch<React.SetStateAction<StepProperties[]>>;
  selectedStep: StepProperties | null;
  setSelectedStep: (step: StepProperties | null) => void;
};

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<StepProperties[]>(initialSteps);
  const [selectedStep, setSelectedStep] = useState<StepProperties | null>(steps[0]);

  const addStep = (step: StepProperties) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const setStep = (id: StepProperties['id'], updatedStep: StepProperties) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? updatedStep : step))
    );
    if (id === selectedStep?.id) {
      setSelectedStep(updatedStep);
    }
  };

  return (
    <StepsContext.Provider
      value={{ steps, addStep, setStep, setSteps, selectedStep, setSelectedStep }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider');
  }
  return context;
};


const initialSteps = [
  {
    id: "1",
    type: StepType.Question,
    name: 'What is the problem you are solving?',
  },
  {
    id: "2",
    type: StepType.ValueProposition,
    name: 'What is the value you are providing?',
  },
  {
    id: "3",
    type: StepType.Feature,
    name: 'What is the first feature you are providing?',
  },
  {
    id: "4",
    type: StepType.Feature,
    name: 'What is the second feature you are providing?',
  },
] satisfies StepProperties[];
