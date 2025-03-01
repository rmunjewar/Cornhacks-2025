import { useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${nightSky})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
      }}
    ></div>
  );
}

function renderObjects() {
  <div>
    {floatingObjects.map((object, index) => (
      <div key={index} x={x} y={y} />
    ))}
  </div>;
}

export default App;
