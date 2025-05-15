import { StyleSheet, View } from "react-native"
import { CHARS, FLAP_HEIGHT, FLAP_WIDTH, SplitFlapCharacter } from "./constants"
import SplitFlapBase from "./SplitFlapBase"
import { shuffle } from "./utils"

const SplitFlap = ({ char }: { char: SplitFlapCharacter }) => {
  const shuffledChars = shuffle(CHARS)
  // const shuffledChars = CHARS
  const index = shuffledChars.indexOf(char.toUpperCase())
  const arr = shuffledChars.slice(0, index).reverse()
  return (
    <View style={styles.container}>
      {arr.map((item, i) => {
        return (
          <SplitFlapBase
            key={item}
            char={item}
            nextChar={arr[i - 1] || char.toUpperCase()}
            index={i}
            totalSplitFlaps={arr.length}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { height: FLAP_HEIGHT, width: FLAP_WIDTH },
})

export default SplitFlap
