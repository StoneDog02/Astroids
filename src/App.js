import "./styles.css";
import {
  Canvas,
  Square,
  Rect,
  MotionBlur,
  ClearCanvas,
  Velocity,
  Transform
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
        <Transform
          transfroms={[
            {
              targets: { rotate: 0 },
              rotate: 360,
              loop: true,
              direction: "alternate",
              duration: 50000,
              //  delay: function(el, i) { return i * 100; },
              // elasticity: 200,
              easing: "easeInOutSine"
            }
          ]}
        >
          <Rect x={210} y={230} width={80} height={40} color="hotpink" />
        </Transform>
      </Canvas>
    </div>
  );
}

const car = {
  make: "Honda",
  model: "Civic",
  year: "2020",
  kind: "Coupe",
  range: { highway: 36, city: 5 }
};
