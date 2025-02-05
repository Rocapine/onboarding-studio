import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback } from 'react'

import { StepCard } from '../components/StepCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, RadioGroup, ScrollView, View, YStack } from 'tamagui'
import { useSteps } from '../contexts/steps-context'
import { v4 as uuidv4 } from 'uuid'
import { QuestionStepType, OnboardingStep, STEP_TYPES } from '../OnboardingSteps/step.type'
import { ExportSheet } from './ExportSheet'
import React from 'react'
import { ImportSheet } from './ImportSheet'



const StepList: FC = () => {
  {
    const { steps, setSteps, setSelectedStep, addStep, selectedStep, deleteStep, getJsonSteps } = useSteps();

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setSteps((prevCards: OnboardingStep[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as OnboardingStep],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (step: OnboardingStep, index: number) => {
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

    const handleRadioChange = (id: OnboardingStep['id']) => {
      const step = steps.find(step => step.id === id);
      if (step) {
        setSelectedStep(step);
      }
    }

    const handleAddStep = () => {
      const newStep = {
        id: uuidv4(),
        type: STEP_TYPES.Question,
        name: "New Step " + (steps.length + 1),
        displayProgressHeader: true,
        payload: {
          answers: [],
          title: 'New Question',
          multipleAnswer: true,
          infoBox: {
            content: "",
            title: ""
          }
        }
      } satisfies QuestionStepType;
      addStep(newStep);
      setSelectedStep(newStep);
    }

    const [exportOpen, setExportOpen] = React.useState(false)
    const [importOpen, setImportOpen] = React.useState(false)

    return (
      <YStack>
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
          <Button onPress={() => setImportOpen(true)}>Import</Button>
          <Button onPress={() => setExportOpen(true)}>Export</Button>
        </YStack>
        <ImportSheet open={importOpen} setOpen={setImportOpen} setSteps={setSteps} />
        <ExportSheet open={exportOpen} setOpen={setExportOpen} getJsonSteps={getJsonSteps} />
      </YStack>
    )
  }
}


export default StepList;
