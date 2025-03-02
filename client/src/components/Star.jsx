import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";


function Star({ size, color, brightness, x, y, supernova, wish }) {
  const [isHovering, setIsHovering] = useState(false);
  // let sizeClass = "mediumSize";
  let brightnessClass = "mediumBright";
  let supernovaClass = "";
  let shootingStarClass = "";

  // if (size === "small") {
  //   sizeClass = "smallSize";
  // } else if (size === "large") {
  //   sizeClass = "largeSize";
  // }

  if (brightness === "dim") {
    brightnessClass = "smallBright";
  } else if (brightness === "bright") {
    brightnessClass = "largeBright";
  }

  if (supernova) {
    supernovaClass = "supernova";
  }


  const handleMouseEnter = () => {
    if (wish) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };


  return (
    <div
      className="star-container"
      style={{ position: "absolute", top: `${y}vh`, left: `${x}vw` }}
    >
      <div
        className={`circle ${brightnessClass} ${supernovaClass}`}
        style={{
          backgroundColor: color,
          "--glow-color": color,
          width: `${size}px`,
          height: `${size}px`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>

      {isHovering && wish && <div className="wish-tooltip">{wish}</div>}
    </div>
  );
}

export default Star;
