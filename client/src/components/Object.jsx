function Object({ image, x, y }) {
  return (
    <div
      style={{
        width: "2vw",
        height: "2vw",
        backgroundImage: `url(${image})`,
        x: { x },
        y: { y },
      }}
    ></div>
  );
}

export default Object;
