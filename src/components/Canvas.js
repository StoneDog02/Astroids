import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";

const VelocityContext = createContext({});

export function Velocity({ d, ...props }) {
  return <VelocityContext.Provider value={d} {...props} />;
}

const CanvasContext = createContext({ canvasNode: null, ctx: null, frame: 0 });

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
      <VelocityContext.Provider value={{}}>
        <canvas ref={canvasRef} {...props} />
        {!canvasNode ? null : children}
      </VelocityContext.Provider>
    </CanvasContext.Provider>
  );
}
//Utils:
export function MotionBlur({ r = 255, g = 255, b = 255, a = 0.3 }) {
  const { ctx } = useContext(CanvasContext);
  const { width, height } = ctx.canvas;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  ctx.fillRect(0, 0, width, height);
  return null;
}
export function ClearCanvas(props) {
  const { ctx } = useContext(CanvasContext);
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  return null;
}

//Shapes:
export function Square({ x, y, color, width }) {
  const properties = useRef({ x, y, color, width });
  const { ctx } = useContext(CanvasContext);
  const { x: dx = 0, y: dy = 0 } = useContext(VelocityContext);
  ctx.fillStyle = color;
  // console.log("SquareProps", properties.current.x, properties.current.y);
  ctx.fillRect(properties.current.x, properties.current.y, width, width);
  useEffect(() => {
    properties.current = {
      x: properties.current.x + dx,
      y: properties.current.y + dy
    };
  });
  return null;
}

export function Rect({ x, y, color, width, height }) {
  const { ctx, frame } = useContext(CanvasContext);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate((Math.PI / 180) * frame);
  ctx.fillStyle = color;
  ctx.fillRect(-40, -20, width, height);
  ctx.restore();
  return null;
}
