import React from "react"
import { SafeAreaView } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplitFlapBase from "./src/components/SplitFap/SplitFlap"

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
          <SplitFlapBase />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
