import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback } from 'react'

import { StepCard } from '../components/StepCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, RadioGroup, ScrollView, View, YStack } from 'tamagui'
import { useSteps } from '../contexts/steps-context'
import { v4 as uuidv4 } from 'uuid'
import { QuestionStepType, StepProperties, StepType } from '../contexts/step.type'



const StepList: FC = () => {
  {
    const { steps, setSteps, setSelectedStep, addStep, selectedStep, deleteStep } = useSteps();

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setSteps((prevCards: StepProperties[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as StepProperties],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (step: StepProperties, index: number) => {
        return (
          <StepCard
            key={step.id}
            index={index}
            id={step.id}
            stepProperties={step}
            moveCard={moveCard}
            onDelete={() => deleteStep(step.id)}
          />
        )
      },
      [],
    )

    const handleRadioChange = (id: StepProperties['id']) => {
      const step = steps.find(step => step.id === id);
      if (step) {
        setSelectedStep(step);
      }
    }

    const handleAddStep = () => {
      const newStep = {
        id: uuidv4(),
        type: StepType.Question,
        name: "New Step",
        hideHeader: false,
        payload: {
          answers: [],
          title: 'New Question',
        }
      } satisfies QuestionStepType;
      addStep(newStep);
      setSelectedStep(newStep);
    }

    return (
      <View flex={1} flexGrow={1}>
        <YStack flex={1} padding={"$4"} gap="$2">
          <View flex={1} alignItems="center" justifyContent="flex-start" >
            <ScrollView width={"100%"}>
              <RadioGroup aria-labelledby="Select one item" name="form" value={selectedStep?.id} onValueChange={handleRadioChange}>
                <DndProvider backend={HTML5Backend}>
                  <View width={"100%"}>{steps.map((card, i) => renderCard(card, i))}</View>
                  <Button variant="outlined" onPress={handleAddStep}>Add Step</Button>
                </DndProvider>
              </RadioGroup>
            </ScrollView>
          </View>
          <Button>Export</Button>
        </YStack>
      </View>
    )
  }
}


export default StepList;
