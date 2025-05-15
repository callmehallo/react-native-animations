import { useEffect } from "react"
import { StyleSheet } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"
import { DURATION, FLAP_HEIGHT, FLAP_WIDTH, VERTICAL_OFFSET } from "./constants"
type SplitFlapBaseProps = {
  char: string
  nextChar: string
  index: number
  totalSplitFlaps: number
}

const SplitFlapBase = ({
  char,
  nextChar,
  index,
  totalSplitFlaps,
}: SplitFlapBaseProps) => {
  const rotateXTop = useSharedValue<number>(0)
  const rotateXBottom = useDerivedValue(() => {
    return rotateXTop.value + 180
  })

  const opacity = useSharedValue(1)

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

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    rotateXTop.value = withDelay(
      DURATION * (totalSplitFlaps - 1 - index),
      withTiming(
        -180,
        {
          duration: DURATION,
          easing: Easing.linear,
        },
        () => {
          if (index !== 0) {
            opacity.value = 0
          }
        }
      )
    )
  }, [])

  return (
    <Animated.View style={[styles.innerContainer, opacityStyle]}>
      {/* TOP STATIC ITEM */}
      <Animated.View style={[styles.topFlap, styles.flap]}>
        <Animated.Text style={[styles.topChar, styles.char]}>
          {nextChar}
        </Animated.Text>
      </Animated.View>
      {/* TOP ROTATING ITEM */}
      <Animated.View
        style={[
          styles.topFlap,
          styles.flap,
          styles.backfaceHidden,
          cardAnimation,
        ]}>
        <Animated.Text style={[styles.topChar, styles.char]}>
          {char}
        </Animated.Text>
      </Animated.View>
      {/* BOTTOM STATIC ITEM */}
      <Animated.View style={[styles.bottomFlap, styles.flap]}>
        <Animated.Text style={[styles.bottomChar, styles.char]}>
          {char}
        </Animated.Text>
      </Animated.View>
      {/* BOTTOM ROTATING ITEM */}
      <Animated.View
        style={[styles.bottomFlap, styles.flap, cardAnimationBottom]}>
        <Animated.Text style={[styles.bottomChar, styles.char]}>
          {nextChar}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    position: "absolute",
    height: FLAP_HEIGHT,
    width: FLAP_WIDTH,
  },
  flap: {
    position: "absolute",
    height: FLAP_HEIGHT / 2,
    width: FLAP_WIDTH,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  topFlap: {
    top: 0,
    transformOrigin: "bottom",
  },
  bottomFlap: {
    bottom: 0,
    zIndex: -1,
    transformOrigin: "top",
  },
  topChar: {
    top: VERTICAL_OFFSET,
  },
  bottomChar: {
    bottom: -VERTICAL_OFFSET,
  },
  char: {
    position: "absolute",
    fontSize: FLAP_HEIGHT * 0.95,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    lineHeight: FLAP_HEIGHT,
  },
  backfaceHidden: {
    backfaceVisibility: "hidden",
  },
})

export default SplitFlapBase
