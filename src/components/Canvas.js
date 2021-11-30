import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";

import anime, { set } from "animejs";

const VelocityContext = createContext({});
const CollisionsContext = createContext([]);
const TransformContext = createContext({});
const CanvasContext = createContext({ canvasNode: null, ctx: null, frame: 0 });

export function Velocity({ d, ...props }) {
  return <VelocityContext.Provider value={d} {...props} />;
}

export function Collisions({ bodies, ...props }) {
  return <CollisionsContext.Provider value={bodies} {...props} />;
}
const t = { rotate: 0 };
const a = [
  {
    targets: t,
    rotate: 360,
    loop: true,
    direction: "alternate",
    //  delay: function(el, i) { return i * 100; },
    // elasticity: 200,
    easing: "easeInOutSine"
  }
];

export function Transform({ transforms = a, ...props }) {
  const { frame } = useContext(CanvasContext);
  const [state, setState] = useState({});
  const [animations, setAnimations] = useState([]);
  useEffect(() => {
    const animations = transforms.map((transform, idx) => {
      return anime({
        autoplay: false,
        ...transform,
        update: function (a) {
          // console.log(a.animatables[idx].target);
          setState({ ...a.animatables[idx].target });
        }
      });
    });
    setAnimations(animations);
  }, [transforms]);
  useEffect(() => {
    animations.map((animation) => {
      animation.seek(animation.duration * ((frame % 100) / 100));
    });
  }, [frame, animations]);

  return <TransformContext.Provider value={state} {...props} />;
}

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
        <Velocity d={{}}>
          <Transform transforms={[]}>
            <canvas ref={canvasRef} {...props} />
            {!canvasNode ? null : children}
          </Transform>
        </Velocity>
      </Collisions>
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
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const { translate, scale, rotate = 0 } = useContext(TransformContext);
  // console.log(rotate)
  const { x: dx = 0, y: dy = 0 } = useContext(VelocityContext);
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillStyle = color;
  ctx.fillRect(-(width / 2), -(height / 2), width, height);
  ctx.restore();
  return null;
}
