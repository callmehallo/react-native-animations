import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { CARD_HEIGHT, VERTICAL_OFFSET } from "./constants"
type SplitFlapBaseProps = {
  letter?: string
}

const SplitFlapBase = ({ letter = "D" }: SplitFlapBaseProps) => {
  const rotateXTop = useSharedValue<number>(0)
  const rotateXBottom = useDerivedValue(() => {
    return rotateXTop.value + 180
  })

  //@ts-ignore
  const cardAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 800,
        },
        {
          rotateX: `${rotateXTop.value}deg`,
        },
      ],
    }
  })

  //@ts-ignore
  const cardAnimationBottom = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 800,
        },
        {
          rotateX: `${rotateXBottom.value}deg`,
        },
      ],
    }
  })

  useEffect(() => {
    rotateXTop.value = withRepeat(
      withTiming(-180, { duration: 1000, easing: Easing.linear }),
      1,
      false
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* TOP STATIC ITEM */}
        <Animated.View style={[styles.itemTop]}>
          <Animated.Text
            style={[
              {
                position: "absolute",
                fontSize: CARD_HEIGHT * 0.95,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
                lineHeight: CARD_HEIGHT,
                top: VERTICAL_OFFSET,
              },
            ]}>
            {"E"}
          </Animated.Text>
        </Animated.View>
        {/* TOP ROTATING ITEM */}
        <Animated.View
          style={[
            styles.itemTop,
            { backfaceVisibility: "hidden" },
            cardAnimation,
          ]}>
          <Animated.Text
            style={[
              {
                position: "absolute",
                fontSize: CARD_HEIGHT * 0.95,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
                lineHeight: CARD_HEIGHT,
                top: VERTICAL_OFFSET,
              },
            ]}>
            {letter}
          </Animated.Text>
        </Animated.View>
        {/* BOTTOM STATIC ITEM */}
        <Animated.View style={[styles.itemBottom]}>
          <Animated.Text
            style={[
              {
                position: "absolute",
                fontSize: CARD_HEIGHT * 0.95,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
                lineHeight: CARD_HEIGHT,
                bottom: -VERTICAL_OFFSET,
              },
            ]}>
            {letter}
          </Animated.Text>
        </Animated.View>
        {/* BOTTOM ROTATING ITEM */}
        <Animated.View style={[styles.itemBottom, cardAnimationBottom]}>
          <Animated.Text
            style={[
              {
                position: "absolute",
                fontSize: CARD_HEIGHT * 0.95,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
                lineHeight: CARD_HEIGHT,
                bottom: -VERTICAL_OFFSET,
              },
            ]}>
            {"E"}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: CARD_HEIGHT,
    width: 200,
  },
  itemTop: {
    top: 0,
    position: "absolute",
    height: CARD_HEIGHT / 2,
    width: 200,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
    transformOrigin: "bottom",
  },
  itemBottom: {
    bottom: 0,
    position: "absolute",
    height: CARD_HEIGHT / 2,
    width: 200,
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: -1,
    transformOrigin: "top",
  },
  letter: {
    fontSize: CARD_HEIGHT * 0.95,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    lineHeight: CARD_HEIGHT,
  },
})

export default SplitFlapBase
