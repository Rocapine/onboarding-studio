import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { isOnboardingStepArray, OnboardingStep, STEP_TYPES } from '../OnboardingSteps/step.type';
import { exportSteps } from '@/utils/export.utils';
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/supabase.client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { debounce } from 'tamagui';

type Variable = {
  name: string;
  value: string;
}

const skeletonStep = {
  id: "skeleton",
  type: STEP_TYPES.MediaContent,
  name: 'Skeleton',
  displayProgressHeader: true,
  payload: {
    imageUrl: 'https://api-ninjas.com/images/cats/abyssinian.jpg',
    title: 'Hello',
    description: 'World',
  }
} as OnboardingStep;

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
  syncStepsStatus?: 'idle' | 'pending' | 'error' | 'success';
};

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const OfflineStepsProvider = ({ children }: { children: ReactNode }) => {
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

export const ProjectStepsProvider = ({ children, projectId }: { children: ReactNode, projectId: string }) => {

  const { data, refetch } = useQuery({
    queryKey: ['project-steps', projectId],
    queryFn: async () => {
      const response = await supabase.
        from('projects')
        .select('steps')
        .eq('id', projectId)
        .single();
      if (response.error) {
        throw new Error('Failed to fetch project steps');
      }
      const steps = response.data.steps;
      if (isOnboardingStepArray(steps)) {
        return steps;
      } else {
        throw new Error('Steps are not in the expected format');
      }
    }
  })

  useEffect(() => {
    const updateSubscription = supabase
      .channel("projects")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "projects", filter: `id=eq.${projectId}` },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      void updateSubscription.unsubscribe();
    };
  }, []);


  const steps = data || [skeletonStep];

  const { mutate: syncSteps, status: syncStepsStatus } = useMutation({
    mutationFn: async (newSteps: OnboardingStep[]) => {
      const jsonifiedSteps = JSON.parse(JSON.stringify(newSteps));
      const { error } = await supabase
        .from('projects')
        .update({ steps: jsonifiedSteps })
        .eq('id', projectId);
      if (error) {
        throw new Error('Failed to update project steps');
      }
    },
  })

  const debouncedSyncSteps = debounce(syncSteps, 500);


  type callbackType = (prevState: OnboardingStep[]) => OnboardingStep[];
  const setSteps = useCallback(async (newStepsOrCallback: OnboardingStep[] | callbackType) => {
    if (typeof newStepsOrCallback === 'function') {
      const newSteps = newStepsOrCallback(steps);
      setSteps(newSteps);
      return;
    }
    debouncedSyncSteps(newStepsOrCallback);
  }, [])


  const [selectedStep, setSelectedStep] = useState<OnboardingStep>(steps[0] || skeletonStep);

  const addStep = (step: OnboardingStep) => {
    setSteps([...steps, step]);
  };

  const setStep = (id: OnboardingStep['id'], updatedStep: OnboardingStep) => {
    const newSteps = steps.map((step) => (step.id === id ? updatedStep : step));
    setSteps(newSteps);
    if (id === selectedStep?.id) {
      setSelectedStep(updatedStep);
    }
  };

  const deleteStep = (id: OnboardingStep['id']) => {
    const newSteps = steps.filter((step) => step.id !== id);
    setSteps(newSteps);
  };

  const getJsonSteps = () => {
    return exportSteps(steps);
  }


  const [variables, setVariables] = useState<Variable[]>([]);



  return (
    <StepsContext.Provider
      value={{ steps, addStep, setStep, setSteps, selectedStep, setSelectedStep, deleteStep, getJsonSteps, variables, setVariables, syncStepsStatus }}
    >
      {children}
    </StepsContext.Provider>
  );
}

export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider');
  }
  return context;
};


export const initialSteps = [
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

