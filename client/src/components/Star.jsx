import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";

function Star({ size, color, brightness, x, y }) {
  let sizeClass = "mediumSize";
  let brightnessClass = "mediumBright";

  if (size === "small") {
    sizeClass = "smallSize";
  } else if (size === "large") {
    sizeClass = "largeSize";
  }

  if (brightness === "small") {
    brightnessClass = "smallBright";
  } else if (brightness === "large") {
    brightnessClass = "largeBright";
  }

  return (
    <div
      className={`circle ${sizeClass} ${brightnessClass}`}
      style={{
        "--backgroundColor": color,
        "--glow-color": color,
        top: y,
        left: x,
      }}
    ></div>
  );
}

export default Star;
