import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { OnboardingStep, STEP_TYPES } from '../OnboardingSteps/step.type';
import { exportSteps } from './export.utils';
import { v4 as uuidv4 } from 'uuid'

type Variable = {
  name: string;
  value: string;
}

type StepsContextType = {
  steps: OnboardingStep[];
  addStep: (step: OnboardingStep) => void;
  setStep: (id: OnboardingStep['id'], updatedStep: OnboardingStep) => void;
  setSteps: React.Dispatch<React.SetStateAction<OnboardingStep[]>>;
  selectedStep: OnboardingStep;
  setSelectedStep: (step: OnboardingStep) => void;
  deleteStep: (id: OnboardingStep['id']) => void;
  getJsonSteps: () => string;
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
};

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectKey = urlParams.get('project');

  useEffect(() => {
    if (!projectKey) {
      window.location.search = '?project=default';
    }
  }, [projectKey]);

  const localStorageKey = projectKey || 'steps';
  const [steps, setSteps] = useState<OnboardingStep[]>(() => {
    const storedSteps = localStorage.getItem(localStorageKey);
    return storedSteps ? JSON.parse(storedSteps) : initialSteps;
  });
  const [selectedStep, setSelectedStep] = useState<OnboardingStep>(steps[0]);

  useEffect(() => {
    const jsonSteps = exportSteps(steps);
    localStorage.setItem(localStorageKey, jsonSteps); // Store JSON in local storage whenever steps change
  }, [steps]);


  const addStep = (step: OnboardingStep) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const setStep = (id: OnboardingStep['id'], updatedStep: OnboardingStep) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? updatedStep : step))
    );
    if (id === selectedStep?.id) {
      setSelectedStep(updatedStep);
    }
  };

  const deleteStep = (id: OnboardingStep['id']) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const getJsonSteps = () => {
    return exportSteps(steps);
  }


  const localStorageVariableKey = projectKey ? `${projectKey}-variables` : 'noproject-variable';
  const [variables, setVariables] = useState<Variable[]>(() => {
    const storedVariables = localStorage.getItem(localStorageVariableKey);
    return storedVariables ? JSON.parse(storedVariables) : [];
  });

  useEffect(() => {
    const variablesString = JSON.stringify(variables);
    localStorage.setItem(localStorageVariableKey, variablesString);
  }, [variables]);


  return (
    <StepsContext.Provider
      value={{ steps, addStep, setStep, setSteps, selectedStep, setSelectedStep, deleteStep, getJsonSteps, variables, setVariables }}
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
    id: uuidv4(),
    type: STEP_TYPES.MediaContent,
    name: 'What is the problem you are solving?',
    displayProgressHeader: true,
    payload: {
      imageUrl: 'https://api-ninjas.com/images/cats/abyssinian.jpg',
      title: 'Hello',
      description: 'World',
      socialProof: {
        numberOfStar: 5,
        content: "I'm a social proof",
        authorName: "John Doe",
      }
    }
  },
  {
    id: uuidv4(),
    type: STEP_TYPES.Question,
    name: 'What is the value you are providing?',
    displayProgressHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
      multipleAnswer: false,
    },
  },
] satisfies OnboardingStep[];
