import { StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"

const ITEM_HEIGHT = 100

type ListItemProps = {
  translateY: SharedValue<number>
  offestY: SharedValue<number>
}

//TODO: ist noch nicht fertig haha

const ListItem = ({ translateY, offestY }: ListItemProps) => {
  const transform = useDerivedValue(() => [
    { translateY: translateY.value + offestY.value },
  ])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: transform.value,
  }))

  // const onLayout = (event: LayoutChangeEvent) => {
  //   positionY.value = event.nativeEvent.layout.y
  // }

  return <Animated.View style={[styles.item, animatedStyle]}></Animated.View>
}

const DraggableList = () => {
  const translateY = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const gesture = Gesture.Pan()
    .onUpdate(({ translationY }) => {
      translateY.value = translationY
    })
    .onFinalize(({ translationY }) => {
      offsetY.value += translationY
      translateY.value = 0
    })

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <ListItem translateY={translateY} offestY={offsetY} />
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: "#FDFAF6",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    height: ITEM_HEIGHT,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#FAF1E6",
  },
})

export default DraggableList
