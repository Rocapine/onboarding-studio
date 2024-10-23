import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { StepCard } from '../components/StepCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RadioGroup, View } from 'tamagui'
import { StepProperties, useSteps } from '../contexts/steps-context'



const StepList: FC = () => {
  {
    const { steps, setSteps } = useSteps();

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
          />
        )
      },
      [],
    )

    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <RadioGroup aria-labelledby="Select one item" defaultValue="1" name="form" onValueChange={(value) => console.log("New radio", value)}>

          <DndProvider backend={HTML5Backend}>
            <View >{steps.map((card, i) => renderCard(card, i))}</View>
          </DndProvider>
        </RadioGroup>
      </View>
    )
  }
}


export default StepList;