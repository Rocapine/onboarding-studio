import { Stack, styled, YStack, View } from 'tamagui'
import type { PropsWithChildren } from 'react'

// Types
type IPhoneModel =
  | 'iphone15Pro'
  | 'iphone15ProMax'
  | 'iphone15'
  | 'iphone15Plus'
  | 'iphone14'
  | 'iphone13'
  | 'iphoneSE'



interface ModelSpecs {
  width: number
  height: number
  borderRadius: number
  hasDynamicIsland: boolean
  islandWidth: number
  islandHeight: number
}

// Model specifications
const MODEL_SPECS: Record<IPhoneModel, ModelSpecs> = {
  iphone15ProMax: {
    width: 330,
    height: 690,
    borderRadius: 55,
    hasDynamicIsland: true,
    islandWidth: 126,
    islandHeight: 38,
  },
  iphone15Pro: {
    width: 320,
    height: 660,
    borderRadius: 53,
    hasDynamicIsland: true,
    islandWidth: 126,
    islandHeight: 38,
  },
  iphone15Plus: {
    width: 330,
    height: 690,
    borderRadius: 55,
    hasDynamicIsland: true,
    islandWidth: 126,
    islandHeight: 30,
  },
  iphone15: {
    width: 320,
    height: 660,
    borderRadius: 53,
    hasDynamicIsland: true,
    islandWidth: 126,
    islandHeight: 38,
  },
  iphone14: {
    width: 320,
    height: 650,
    borderRadius: 50,
    hasDynamicIsland: false,
    islandWidth: 140,
    islandHeight: 24,
  },
  iphone13: {
    width: 320,
    height: 640,
    borderRadius: 45,
    hasDynamicIsland: false,
    islandWidth: 136,
    islandHeight: 24,
  },
  iphoneSE: {
    width: 300,
    height: 580,
    borderRadius: 35,
    hasDynamicIsland: false,
    islandWidth: 124,
    islandHeight: 16,
  },
}

const PhoneFrame = styled(YStack, {
  name: 'PhoneFrame',
  backgroundColor: 'transparent',
  shadowColor: '$shadowColor',
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.25,
  padding: 16,
  position: 'relative',

  variants: {
    model: Object.fromEntries(
      Object.entries(MODEL_SPECS).map(([key, specs]) => [
        key,
        {
          width: specs.width,
          height: specs.height,
          borderRadius: specs.borderRadius,
        }
      ])
    ),
  } as const,
})

// Dynamic Island
const DynamicIsland = styled(View, {
  name: 'DynamicIsland',
  backgroundColor: 'black',
  position: 'absolute',
  top: 12,
  left: '50%',
  zIndex: 20,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    model: Object.fromEntries(
      Object.entries(MODEL_SPECS).map(([key, specs]) => [
        key,
        {
          width: specs.islandWidth,
          height: specs.islandHeight,
          transform: [{ translateX: -specs.islandWidth / 2 }, { translateY: +specs.islandHeight / 2 }],
        }
      ])
    ),
  } as const,
})

const Screen = styled(YStack, {
  name: 'Screen',
  backgroundColor: 'white',
  overflow: 'hidden',
  flex: 1,

  variants: {
    model: Object.fromEntries(
      Object.entries(MODEL_SPECS).map(([key, specs]) => [
        key,
        {
          borderRadius: specs.borderRadius - 15,
        }
      ])
    ),
  } as const,
})

const StatusBar = styled(View, {
  name: 'StatusBar',
  height: 24,
  backgroundColor: 'transparent',
  width: '100%',
})

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
  overflow: 'hidden',
})

const Button = styled(View, {
  name: 'Button',
  backgroundColor: '$gray700',
  position: 'absolute',
  width: 4,

  variants: {
    type: {
      power: {
        right: -2,
        top: 80,
        height: 64,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      volumeUp: {
        left: -2,
        top: 80,
        height: 32,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
      volumeDown: {
        left: -2,
        top: 128,
        height: 32,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
      action: {  // Action button for iPhone 15 Pro models
        right: -2,
        top: 160,
        height: 24,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
    },
  } as const,
})

const HomeIndicator = styled(View, {
  name: 'HomeIndicator',
  position: 'absolute',
  bottom: 4,
  left: '50%',
  width: 96,
  height: 4,
  backgroundColor: '$gray600',
  borderRadius: 100,
  transform: [{ translateX: -48 }],
})

interface IPhoneFrameProps {
  model?: IPhoneModel
  showStatusBar?: boolean
  showHomeIndicator?: boolean
  backgroundColor?: string
  titaniumColor?: string  // For iPhone 15 Pro models
}

export function IPhoneFrame({
  model = 'iphone15',
  showStatusBar = true,
  showHomeIndicator = true,
  backgroundColor = 'white',
  titaniumColor = '#424242',
  children,
  ...props
}: PropsWithChildren<IPhoneFrameProps>) {
  const specs = MODEL_SPECS[model]
  const isPro = model.includes('Pro')

  return (
    <Stack position="relative" {...props}>
      <PhoneFrame
        model={model}
        backgroundColor={isPro ? titaniumColor : 'black'}
      >
        {specs.hasDynamicIsland ? (
          <DynamicIsland model={model}>
            {/* Can be extended to show Dynamic Island content */}
          </DynamicIsland>
        ) : (
          <View
            position="absolute"
            top={0}
            left="50%"
            width={specs.islandWidth}
            height={specs.islandHeight}
            backgroundColor="black"
            borderBottomLeftRadius={24}
            borderBottomRightRadius={24}
            transform={[{ translateX: -specs.islandWidth / 2 }]}
            zIndex={20}
          />
        )}

        <Screen model={model} backgroundColor={backgroundColor}>
          {showStatusBar && <StatusBar />}
          <ContentContainer>
            {children}
          </ContentContainer>
        </Screen>
        {showHomeIndicator && <HomeIndicator />}
      </PhoneFrame>

      <Button type="power" />
      <Button type="volumeUp" />
      <Button type="volumeDown" />
      {isPro && <Button type="action" />}
    </Stack>
  )
}