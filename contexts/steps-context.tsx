import { createContext, useContext, useState, ReactNode } from 'react';
import { StepProperties, StepType } from './step.type';


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
    type: StepType.MediaContent,
    name: 'What is the problem you are solving?',
    hideHeader: true,
    payload: {
      imageUrl: 'https://api-ninjas.com/images/cats/abyssinian.jpg',
      title: 'Hello',
      description: 'World',
    }
  },
  {
    id: "2",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    }
  },

] satisfies StepProperties[];
