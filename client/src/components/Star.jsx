import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Star.css";


function Star({ size, color, brightness, x, y, supernova, shootingStar, wish}) {
  const [isHovering, setIsHovering] = useState(false);
  let supernovaClass = "";
  let shootingStarClass = "";

  if (supernova) {
    supernovaClass = "supernova";
  }

  if (shootingStar){
    shootingStarClass = "shootingStar";
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
      <div className="shootingStar"></div>
      <div
        className={`circle ${supernovaClass} ${shootingStarClass}`}
        style={{
          backgroundColor: color,
          "--glow-color": color,
          width: `${size}px`,
          height: `${size}px`,
          opacity: `${brightness}`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>

      {isHovering && wish && <div className="wish-tooltip">{wish}</div>}
    </div>
  );
}

export default Star;
