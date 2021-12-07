import { useContext } from "react";
import { CanvasContext } from "./Canvas";

export function MotionBlur({ r = 255, g = 255, b = 255, a = 0.3 }) {
  const { ctx } = useContext(CanvasContext);
  const { width, height } = ctx.canvas;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  ctx.fillRect(0, 0, width, height);
  return null;
}
