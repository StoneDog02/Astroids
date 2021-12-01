import "./styles.css";
import {
  Canvas,
  Square,
  Rect,
  MotionBlur,
  ClearCanvas,
  Velocity,
  Transform,
  Collisions
} from "./components/Canvas";
import { useCallback, useEffect, useState } from "react";
const DEBRIS_VELOCITY = 0.1;
export default function App() {
  const [astroids, setAstroids] = useState([
    {
      id: 0,
      d: { x: DEBRIS_VELOCITY, y: DEBRIS_VELOCITY },
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      color: "aqua"
    },
    {
      id: 1,
      d: { x: -DEBRIS_VELOCITY, y: -DEBRIS_VELOCITY },
      x: 450,
      y: 450,
      width: 50,
      height: 50,
      color: "rebeccapurple"
    },
    {
      id: 2,
      d: { x: DEBRIS_VELOCITY, y: -DEBRIS_VELOCITY },
      x: 0,
      y: 450,
      width: 50,
      height: 50,
      color: "rebeccapurple"
    },
    {
      id: 3,
      d: { x: -DEBRIS_VELOCITY, y: DEBRIS_VELOCITY },
      x: 450,
      y: 0,
      width: 50,
      height: 50,
      color: "aqua"
    }
  ]);

  return (
    <div className="App">
      <Canvas width="500" height="500">
        <MotionBlur a={0.5} />
        {/* <ClearCanvas /> */}
        <Collisions bodies={astroids}>
          {astroids.map((astroid) => (
            <Velocity
              key={astroid.id}
              body={astroid}
              updateBody={(body) => {
                // console.log("newD", body);
                astroids[astroid.id] = body;
                setAstroids([...astroids]);
              }}
            >
              <Square
                x={astroid.x}
                y={astroid.y}
                width={astroid.width}
                color={astroid.color}
              />
            </Velocity>
          ))}
        </Collisions>
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
