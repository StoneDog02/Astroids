import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import { Collisions } from "./Collisions";
import { Transform } from "./Transform";

export const CanvasContext = createContext({
  canvasNode: null,
  ctx: null,
  frame: 0
});

export function Canvas({ children, ...props }) {
  const [canvasNode, setCanvasNode] = useState(null);
  const canvasRef = useCallback((canvasNode) => {
    setCanvasNode(canvasNode);
  }, []);

  const [frame, setFrame] = useState(0);

  const draw = useCallback(
    function draw() {
      setFrame(frame + 1);
    },
    [frame]
  );

  useEffect(() => {
    let raf = window.requestAnimationFrame(draw);

    // TODO: Make this conditional

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [draw]);

  return (
    <CanvasContext.Provider
      value={{ canvasNode, ctx: canvasNode?.getContext("2d") || null, frame }}
    >
      <Collisions bodies={[]}>
        <Transform transforms={[]}>
          <canvas ref={canvasRef} {...props} />
          {!canvasNode ? null : children}
        </Transform>
      </Collisions>
    </CanvasContext.Provider>
  );
}

//Utils:
