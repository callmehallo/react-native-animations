import React from "react"
import { SafeAreaView } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplitFlap from "./src/components/SplitFap"

const App = () => {
  const strToDisplay = "HELLO WORLD"
  const chars = strToDisplay.split("")

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {chars.map((char, index) => (
            <SplitFlap key={index} char={char} />
          ))}
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
