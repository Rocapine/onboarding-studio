// create a steps context to manage the steps list

import { createContext, useContext, useState, ReactNode } from 'react';

export type StepProperties = {
  id: string;
  type: string;
  name: string;
  // Add other properties as needed
};

type StepsContextType = {
  steps: StepProperties[];
  addStep: (step: StepProperties) => void;
  setStep: (id: number, updatedStep: StepProperties) => void;
  setSteps: React.Dispatch<React.SetStateAction<StepProperties[]>>;
  selectedStep: StepProperties | null;
  setSelectedStep: (step: StepProperties | null) => void;
};

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<StepProperties[]>(initialSteps);
  const [selectedStep, setSelectedStep] = useState<StepProperties | null>(null);

  const addStep = (step: StepProperties) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const setStep = (id: StepProperties['id'], updatedStep: StepProperties) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? updatedStep : step))
    );
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
    type: 'Question 6',
    name: 'What is the problem you are solving?',
  },
  {
    id: "2",
    type: 'Value Proposition',
    name: 'What is the value you are providing?',
  },
  {
    id: "3",
    type: 'Feature 1',
    name: 'What is the first feature you are providing?',
  },
  {
    id: "4",
    type: 'Feature 2',
    name: 'What is the second feature you are providing?',
  },
] satisfies StepProperties[];
