import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";

function Star({ size, color, brightness, x, y, supernova, shootingStar }) {
  let sizeClass = "mediumSize";
  let brightnessClass = "mediumBright";
  let supernovaClass = "";
  let shootingStarClass = "";

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

  if (shootingStar) {
    shootingStarClass = "shootingStar";
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
