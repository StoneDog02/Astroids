import "./styles.css";
import {
  Canvas,
  Square,
  Rect,
  MotionBlur,
  ClearCanvas,
  Velocity
} from "./components/Canvas";
import { useCallback, useEffect, useState } from "react";
const DEBRIS_VELOCITY = 2;
export default function App() {
  return (
    <div className="App">
      <Canvas width="500" height="500">
        <MotionBlur a={0.5} />
        {/* <ClearCanvas /> */}
        <Velocity d={{ x: DEBRIS_VELOCITY, y: DEBRIS_VELOCITY }}>
          <Square x={0} y={0} width={50} color="aqua" />
        </Velocity>
        <Velocity d={{ x: -DEBRIS_VELOCITY, y: -DEBRIS_VELOCITY }}>
          <Square x={450} y={450} width={50} color="rebeccapurple" />
        </Velocity>
        <Velocity d={{ x: DEBRIS_VELOCITY, y: -DEBRIS_VELOCITY }}>
          <Square x={0} y={450} width={50} color="rebeccapurple" />
        </Velocity>
        <Velocity d={{ x: -DEBRIS_VELOCITY, y: DEBRIS_VELOCITY }}>
          <Square x={450} y={0} width={50} color="aqua" />
        </Velocity>
        <Rect x={210} y={230} width={80} height={40} color="hotpink" />
      </Canvas>
    </div>
  );
}
