import {
  Canvas,
  Group,
  interpolateColors,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia"
import { useEffect } from "react"
import { View } from "react-native"
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"

const SIZE = 350

const colors = [
  "grey",
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "teal",
  "lavender",
]

const SkieShapeGradient = () => {
  const x1 = useSharedValue(0)
  const y1 = useSharedValue(0)

  const x2 = useSharedValue(SIZE)
  const y2 = useSharedValue(SIZE)
  const color = useSharedValue(0)
  const color2 = useSharedValue(colors.length / 2)

  // Create derived values that properly track their source values
  //we need the whole object to be updated, not just the values
  const startPoint = useDerivedValue(() => {
    return vec(x1.value, y1.value)
  })

  const endPoint = useDerivedValue(() => {
    return vec(x2.value, y2.value)
  })

  useEffect(() => {
    // x1.value = withRepeat(withTiming(SIZE, { duration: 1000 }), -1, true)
    // x2.value = withRepeat(withTiming(0, { duration: 400 }), -1, true)
    // y1.value = withRepeat(withTiming(SIZE, { duration: 200 }), -1, true)
    // y2.value = withRepeat(withTiming(0, { duration: 399 }), -1, true)

    // y1.value = withRepeat(withTiming(SIZE, { duration: 1000 }), -1, true)
    x1.value = withRepeat(withTiming(SIZE, { duration: 500 }), -1, true)
    // y2.value = withRepeat(withTiming(0, { duration: 500 }), -1, true)
    x2.value = withRepeat(withTiming(0, { duration: 500 }), -1, true)

    color.value = withRepeat(
      withTiming(colors.length, { duration: 1500 }),
      -1,
      true
    )
    color2.value = withSequence(
      withTiming(0, { duration: 2000 }),
      withRepeat(withTiming(colors.length, { duration: 2200 }), -1, true)
    )
  }, [])

  const gradientColors = useDerivedValue(() => [
    interpolateColors(
      color.value,
      colors.map((_, i) => i),
      colors
    ),
    interpolateColors(
      color.value - 1,
      colors.map((_, i) => i),
      colors
    ),
  ])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Group>
          <RoundedRect x={0} y={0} height={SIZE} width={SIZE} r={16}>
            {/* <LinearGradient
              start={startPoint}
              end={endPoint}
              colors={gradientColors}
            /> */}
            <LinearGradient
              start={startPoint}
              end={endPoint}
              colors={["red", "blue"]}
            />
          </RoundedRect>
        </Group>
      </Canvas>
    </View>
  )
}

export default SkieShapeGradient
