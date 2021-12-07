import { useContext } from "react";
import { CanvasContext } from "../Canvas";

export function ClearCanvas(props) {
  const { ctx } = useContext(CanvasContext);
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  return null;
}
