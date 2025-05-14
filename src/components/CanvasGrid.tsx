import { Canvas, Group, Line, Text, useFont } from "@shopify/react-native-skia"
import useSafeAreaDimensions from "../hooks/useSafeAreaDimensions"

/**
 *
 * @prop {React.ReactNode} children - MUST BE SKIA COMPONENT
 * @returns Grid beneath children
 */
const GridCanvas = ({ children }: { children: React.ReactNode }) => {
  const { width, height } = useSafeAreaDimensions()

  const fontSize = 16
  const font = useFont(require("./assets/fonts/Roboto-Black.ttf"), fontSize)
  const topRightWidth = font?.measureText(`${width}/0`).width
  const bottomRightWidth = font?.measureText(`${width}/${height}`).width + 2

  const DISTANCE = width / 10
  const DISTANCE2 = height / 2 / 10

  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      <Group>
        {Array.from({ length: width / DISTANCE }).map((_, i) => (
          <Line
            key={i}
            color='#000'
            p1={{ x: i * DISTANCE, y: 0 }}
            p2={{ x: i * DISTANCE, y: height }}
          />
        ))}
        {Array.from({ length: height / DISTANCE2 + 1 }).map((_, i) => (
          <Line
            key={i}
            color='#000'
            p1={{ x: 0, y: i * DISTANCE2 }}
            p2={{ x: height, y: i * DISTANCE2 }}
          />
        ))}

        <Text font={font} x={0} y={fontSize} text={"0/0"} />
        <Text font={font} x={0 + 4} y={height} text={`0/${height}`} />
        <Text
          font={font}
          x={width - bottomRightWidth}
          y={height}
          text={`${width}/${height}`}
        />

        <Text
          font={font}
          x={width - topRightWidth}
          y={fontSize}
          text={`${width}/0`}
        />
      </Group>
      {children}
    </Canvas>
  )
}

export default GridCanvas
