import { useContext } from "react";
import { CanvasContext } from "./Canvas";

export function Square({ x, y, color, width }) {
  // console.log(x)
  const { ctx } = useContext(CanvasContext);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, width);

  return null;
}
