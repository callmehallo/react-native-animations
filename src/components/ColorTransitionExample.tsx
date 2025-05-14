import { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

const ColorTransitionExample = () => {
  const sv = useSharedValue(1)

  const animated = useAnimatedStyle(() => {
    return {
      borderRadius: 16,
      width: 200,
      height: 200,
      backgroundColor: interpolateColor(sv.value, [0, 1], ["grey", "black"]),
    }
  })

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(0, { duration: 1000 }),
      -1, // Infinite repetitions
      true // Reverse the animation
    )
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Animated.View style={animated} />
    </View>
  )
}

export default ColorTransitionExample
