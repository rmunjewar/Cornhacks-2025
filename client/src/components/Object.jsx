import "./Object.css";

function Object({ image, x, y, rotation = 0 }) {
  // galileo, corn, cow, ufo, astronaut, moon
  let imageClass = image;

  return (
    <div
      className={image}
      style={{
        width: "2.5vw",
        height: "2.5vw",
        backgroundImage: `url(${image})`,
        position: "absolute",
        left: `${x}vw`,
        top: `${y}vh`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        opacity: 0.52,
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.5s ease",
      }}
    ></div>
  );
}

export default Object;
