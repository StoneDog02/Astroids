import "./styles.css";
import { Canvas } from "./components/Canvas";
import { Collisions, detectCollision } from "./components/Collisions";
import { MotionBlur } from "./components/MotionBlur";
import { Transform } from "./components/Transform";
import { Velocity } from "./components/Velocity";
import { Square } from "./components/Square";
import { Rect } from "./components/Rect";
import { useCallback, useEffect, useReducer, useState } from "react";
const DEBRIS_VELOCITY = 2;

const initialState = {
  astroids: [
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
  ]
};
const ACTIONS = {
  UPDATE_ASTROID: "UPDATE_ASTROID"
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.UPDATE_ASTROID:
      debugger;
      return {
        ...state,
        astroids: state.astroids.map((astroid) =>
          astroid.id === payload.id ? payload : astroid
        )
      };
    default:
      throw new Error(`reducer cannot handle type: ${type}`);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { astroids } = state;
  const updateAstroid = useCallback((astroid) => {
    // astroid.id === 0 && console.log(astroid.d)
    dispatch({ type: ACTIONS.UPDATE_ASTROID, payload: astroid });
  }, []);

  return (
    <div className="App">
      <Canvas width="500" height="500">
        <MotionBlur a={0.5} />
        {/* <ClearCanvas /> */}
        <Collisions
          bodies={[
            { x: -10, y: 0, width: 10, height: 500 },
            { x: 500, y: 0, width: 10, height: 500 },
            ...astroids
          ]}
        >
          {astroids.map((astroid) => (
            <Velocity
              key={astroid.id}
              body={astroid}
              updateBody={updateAstroid}
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
