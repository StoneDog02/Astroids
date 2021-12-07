import { useContext } from "react";
import { TransformContext } from "./Transform";
import { CanvasContext } from "./Canvas";

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
