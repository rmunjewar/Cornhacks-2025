import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";

function Star({ size, color, brightness }) {
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
    // <div style={{ backgroundColor: "black", width: "6vw", height: "6vw" }}>
    <div
      className={`circle ${sizeClass} ${brightnessClass}`}
      style={{ backgroundColor: color, "--glow-color": color }}
    ></div>
    // {/* </div> */}
  );
}

export default Star;
