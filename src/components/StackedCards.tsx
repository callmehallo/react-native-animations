import { StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

const ROTATION = 6

type SingleCardProps = {
  index: number
  sv: SharedValue<number>
}

const Card = ({ index, sv }: SingleCardProps) => {
  const animated = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(sv.value, [-1, 1], [0, 25 * index]),
      },
      {
        translateY: interpolate(sv.value, [-1, 1], [0, -5 * index]),
      },
      {
        rotate: `${interpolate(
          sv.value,
          [-1, 1],
          [-ROTATION * index, ROTATION * 1.5 * index]
        )}deg`,
      },
    ] as any,
  }))

  return <Animated.View style={[styles.card, { zIndex: -index }, animated]} />
}

const StackedCards = () => {
  const sv = useSharedValue(-1)
  const longPress = Gesture.LongPress()
    .onBegin(() => {
      sv.value = withSpring(1)
    })
    .onFinalize(() => {
      sv.value = withSpring(-1)
    })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={longPress}>
        <View style={{ width: 130, height: 200 }}>
          {Array.from({ length: 5 }).map((_, index) => {
            return <Card key={index} index={index} sv={sv} />
          })}
        </View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B4EBE6",
  },
  card: {
    position: "absolute",
    width: 130,
    height: 200,
    backgroundColor: "#FBF8EF",
    borderColor: "#80CBC4",
    borderRadius: 24,
    borderWidth: 1,
  },
})

export default StackedCards
