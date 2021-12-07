import { useEffect, useContext, useRef } from "react";
import { CanvasContext } from "./Canvas";
import { CollisionsContext, detectCollision } from "./Collisions";
import { NOOP } from "./NOOP";

export function Velocity({ body, updateBody = NOOP, children, ...props }) {
  const { frame } = useContext(CanvasContext);
  const previousFrame = useRef(null);
  const bodies = useContext(CollisionsContext);
  let hasCollision = false;
  for (let i = 0; i < bodies.length; i++) {
    const otherBody = bodies[i];
    if (otherBody.id === body.id) {
      continue;
    }
    if (detectCollision(body, otherBody)) {
      hasCollision = true;
    }
  }
  useEffect(() => {
    // console.log(previousFrame.current, frame)
    if (previousFrame.current !== frame) {
      if (hasCollision) {
        // console.log("collision");
        // TODO collect all collided bodies then do math
        Object.keys(body.d).forEach((dKey) => {
          body.d[dKey] = -body.d[dKey];
        });
      }
      // console.log(hasCollision)
      updateBody({
        ...body,
        x: body.x + body.d.x,
        y: body.y + body.d.y
        // d: { x: 0, y: 0 }
      });
    }
  }, [frame, body, updateBody, hasCollision]);
  useEffect(() => {
    previousFrame.current = frame;
  });
  return <>{children}</>;
}
