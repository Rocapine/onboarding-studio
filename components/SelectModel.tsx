import { Select, YStack } from "tamagui"
import { SelectProps } from "tamagui/types"
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons"
import { IPhoneModel } from "./iPhone"
import React from "react"
import { LinearGradient } from "tamagui/linear-gradient"

type SelectModelProps = SelectProps & {
  selectedModel: IPhoneModel
  handleModelChange: (value: string) => void
}

export const SelectModel = (props: SelectModelProps) => {
  const { selectedModel, handleModelChange } = props
  return (
    <Select value={selectedModel} onValueChange={handleModelChange} disablePreventBodyScroll >
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="No model selected" />
      </Select.Trigger>
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
            <Select.Label>Model</Select.Label>
            {React.useMemo(
              () =>
                Object.values(IPhoneModel).map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item}
                      value={item}
                    >
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [Object.values(IPhoneModel)]
            )}
          </Select.Group>

        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}