import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";

function Star({ size, color, brightness, x, y, supernova = false }) {
  let sizeClass = "mediumSize";
  let brightnessClass = "mediumBright";
  let supernovaClass = "";

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

  if (supernova) {
    supernovaClass = "supernova";
  }

  return (
    <div
      className={`circle ${sizeClass} ${brightnessClass} ${supernovaClass}`}
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
