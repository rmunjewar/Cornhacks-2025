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

  if (brightness === "dim") {
    brightnessClass = "smallBright";
  } else if (brightness === "bright") {
    brightnessClass = "largeBright";
  }

  return (
    <div
      className={`circle ${sizeClass} ${brightnessClass}`}
      style={{
        "background-color": color,
        "--glow-color": color,
        top: `${y}vh`,
        left: `${x}vw`,
      }}
    ></div>
  );
}

export default Star;
