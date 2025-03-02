import "./ShootingStar.css";

function ShootingStar({ x, y, rotation = 0 }) {
  
  return (
    <div
      className="shooting-star"
      style={{
        width: "0.2vw",
        height: "0.2vw",
        left: `${x}vw`,
        top: `${y}vh`,
        zIndex: 1,
        rotate: `${rotation}rad`
      }}
    ></div>
  );
}

export default ShootingStar;
