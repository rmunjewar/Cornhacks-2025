function Object({ image }) {
  return (
    <div
      style={{
        width: "2vw",
        height: "2vw",
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
}

export default Object;
