import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Text, Card, RadioGroup, XStack, Stack } from 'tamagui'
import { OnboardingStep } from '../OnboardingSteps/step.type'
import { Trash2 } from '@tamagui/lucide-icons'
import { Pressable } from 'react-native'

export const ItemTypes = {
  CARD: 'card',
}

export interface CardProps {
  id: any
  index: number
  stepProperties: OnboardingStep
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onDrop: () => void
  onDelete: () => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const StepCard: FC<CardProps> = ({ id, index, stepProperties, moveCard, onDelete, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    drop(item: DragItem, monitor) {
      onDrop()
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <Card ref={ref}
      padding="$2"
      marginBottom="$2"
      borderWidth={1}
      cursor="move"
      opacity={opacity}
      width={"100%"}
      data-handler-id={handlerId}
    >
      <XStack alignItems="center" justifyContent="space-between" gap="$2" >
        <Stack flex={1} width={"15vw"}>
          <Text>{index + 1}: {stepProperties.name}</Text>
          <Text>{stepProperties.type}</Text>
        </Stack>
        <Pressable onPress={onDelete}><Trash2 strokeWidth={1} /></Pressable>
        <RadioGroup.Item value={id.toString()} id={id.toString()} >
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      </XStack>
    </Card>
  )
}
