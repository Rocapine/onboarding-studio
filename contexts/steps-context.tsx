import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StepProperties, StepType } from './step.type';
import { exportSteps } from './export.utils';


type StepsContextType = {
  steps: StepProperties[];
  addStep: (step: StepProperties) => void;
  setStep: (id: StepProperties['id'], updatedStep: StepProperties) => void;
  setSteps: React.Dispatch<React.SetStateAction<StepProperties[]>>;
  selectedStep: StepProperties;
  setSelectedStep: (step: StepProperties) => void;
  deleteStep: (id: StepProperties['id']) => void;
  getJsonSteps: () => string;
};

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<StepProperties[]>(() => {
    const storedSteps = localStorage.getItem('steps');
    return storedSteps ? JSON.parse(storedSteps) : initialSteps;
  });
  const [selectedStep, setSelectedStep] = useState<StepProperties>(steps[0]);

  useEffect(() => {
    const jsonSteps = exportSteps(steps);
    localStorage.setItem('steps', jsonSteps); // Store JSON in local storage whenever steps change
  }, [steps]);


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

  const deleteStep = (id: StepProperties['id']) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const getJsonSteps = () => {
    return exportSteps(steps);
  }

  return (
    <StepsContext.Provider
      value={{ steps, addStep, setStep, setSteps, selectedStep, setSelectedStep, deleteStep, getJsonSteps }}
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
    },
  },
  {
    id: "3",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "4",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "5",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "6",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "7",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "8",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "9",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "10",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "11",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "12",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "13",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "14",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "15",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
  {
    id: "16",
    type: StepType.Question,
    name: 'What is the value you are providing?',
    hideHeader: false,
    payload: {
      answers: [],
      title: 'Hello',
    },
  },
] satisfies StepProperties[];
