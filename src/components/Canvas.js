import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";

import anime from "animejs";
const NOOP = () => {};
const CollisionsContext = createContext([]);
const TransformContext = createContext({});
const CanvasContext = createContext({ canvasNode: null, ctx: null, frame: 0 });

export function detectCollision(rect1, rect2) {
  debugger;
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  );
}

export function Velocity({ body, updateBody = NOOP, children, ...props }) {
  // const { frame } = useContext(CanvasContext);
  const bodies = useContext(CollisionsContext);
  for (let i = 0; i < bodies.length; i++) {
    const otherBody = bodies[i];
    if (otherBody.id === body.id) {
      continue;
    }
    const hasCollision = detectCollision(body, otherBody);
    debugger;
    if (hasCollision) {
      console.log("collision");
      // TODO collect all collided bodies then do math
      Object.keys(body.d).forEach((dKey) => {
        body.d[dKey] = -body.d[dKey];
      });
    }
  }
  useEffect(() => {
    // console.log(body)
    updateBody({
      ...body,
      x: body.x + body.d.x,
      y: body.y + body.d.y
      // d: { x: 0, y: 0 }
    });
  });
  return <>{children}</>;
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
        <Transform transforms={[]}>
          <canvas ref={canvasRef} {...props} />
          {!canvasNode ? null : children}
        </Transform>
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
  // console.log(x)
  const { ctx } = useContext(CanvasContext);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, width);

  return null;
}

export function Rect({ x, y, color, width, height }) {
  const { ctx, frame } = useContext(CanvasContext);
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const { translate, scale, rotate = 0 } = useContext(TransformContext);
  // console.log(rotate)
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillStyle = color;
  ctx.fillRect(-(width / 2), -(height / 2), width, height);
  ctx.restore();
  return null;
}
