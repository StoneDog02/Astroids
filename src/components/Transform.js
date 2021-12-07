import { createContext, useContext, useState, useEffect } from "react";
import { CanvasContext } from "./Canvas";
import anime from "animejs";

export const TransformContext = createContext({});

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
