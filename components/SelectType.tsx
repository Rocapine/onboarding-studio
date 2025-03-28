import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React from 'react'

import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Label, Select, Sheet, XStack, YStack, getFontSize } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { STEP_TYPES, StepType } from '../OnboardingSteps/step.type'

const StepTypes = Object.values(STEP_TYPES)

type SelectTypeProps = {
  selectedType: StepType;
  setSelectedType: (type: StepType) => void;
}

export function SelectType({ selectedType, setSelectedType }: SelectTypeProps) {
  return (
    <YStack gap="$4">
      <XStack ai="center" gap="$4">
        <Label htmlFor="select-type" f={1} miw={80}>
          Type
        </Label>
        <SelectTypeItem id="select-type" selectedType={selectedType} setSelectedType={setSelectedType} />
      </XStack>
    </YStack>
  )
}

export function SelectTypeItem(props: SelectProps & SelectTypeProps) {
  const { selectedType, setSelectedType } = props

  const items = React.useMemo(
    () =>
      StepTypes.map((item, i) => {
        return (
          <Select.Item
            index={i}
            key={item}
            value={item}
          >
            <Select.ItemText key={`${item}-text`}>{item}</Select.ItemText>
            <Select.ItemIndicator marginLeft="auto">
              <Check size={16} />
            </Select.ItemIndicator>
          </Select.Item>
        )
      }),
    []
  )
  return (
    <Select value={selectedType} onValueChange={setSelectedType} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="No type selected" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={['transform', 'opacity']}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Type</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {items}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

