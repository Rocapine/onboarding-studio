import { Button, Sheet, XStack, YStack, Input, Stack } from 'tamagui';
import { useSteps } from '../contexts/steps-context';
import { Trash2 } from '@tamagui/lucide-icons';

type Variable = {
  name: string;
  value: string;
}


export const VariableSheet = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const { variables, setVariables } = useSteps();

  const handleInputChange = (variableIndex: number, variable: Variable) => {
    console.log(variable)
    setVariables(variables.map((v, index) => index === variableIndex ? variable : v))
  };

  const deleteVarible = (variableIndex: number) => {
    setVariables(variables.filter((_, index) => index !== variableIndex))
  }

  const handleAddNewVariable = () => {
    setVariables([...variables, { name: 'newvariable' + variables.length, value: 'New value' }])
  }



  return (
    <Sheet modal open={open} onOpenChange={setOpen}>
      <Sheet.Overlay />
      <Sheet.Frame>
        <Sheet.ScrollView>
          <YStack flex={1} gap="$2" padding="$2">
            {variables.map((variable, answerIndex) => (
              <XStack key={`answer-${answerIndex}`} gap="$2" alignItems="center">
                <Input
                  flex={1}
                  placeholder="Name"
                  defaultValue={variable.name}
                  onChangeText={(name: string) => handleInputChange(answerIndex, { ...variables[answerIndex], name: name.trim().toLocaleLowerCase().replace(/\s+/g, '-') })}
                />
                <Input
                  flex={1}
                  placeholder="Value"
                  defaultValue={variable.value}
                  onChangeText={(value: string) => handleInputChange(answerIndex, { ...variables[answerIndex], value: value.trim() })}
                />
                <Stack onPress={() => deleteVarible(answerIndex)}>
                  <Trash2 />
                </Stack>
              </XStack>
            ))}
            <Button onPress={() => handleAddNewVariable()}>Add Variable</Button>
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};