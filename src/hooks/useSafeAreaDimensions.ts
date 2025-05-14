import { useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
/**
 * returns the width and height of the screen minus the safe area insets
 * important for drawing on the screen, because the safe area insets are not part of the drawing area
 * @returns {width: number, height: number}
 */
const useSafeAreaDimensions = () => {
  const { top, bottom, left, right } = useSafeAreaInsets()
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const width = windowWidth - left - right
  const height = windowHeight - top - bottom

  return { width, height }
}

export default useSafeAreaDimensions
