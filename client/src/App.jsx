import { useEffect, useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import corn from "./assets/corn.jpeg";
import cow from "./assets/cow.jpeg";
import ufo from "./assets/ufo.jpeg";
import astronaut from "./assets/astronaut.jpeg";
import moon from "./assets/moon.jpeg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import forestSkyline from "./assets/forest-skyline.png";
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";

import { exampleStars } from "./ExampleStars";

const floatingObjects = [corn, cow, ufo, astronaut, moon];

function App() {
  // const [floatingObjects, setFloatingObjects] = useState([]);

  const [stars, setStars] = useState(exampleStars);
  const [floatingObjects, setFloatingObjects] = useState([]);
  const [componentPosition, setComponentPosition] = useState(null);
  const [appState, setAppState] = useState("view");

  if (appState === "setStar") {
  }

  // Function to handle the click event
  const handleClick = (event) => {
    const x = event.clientX; // X position of click
    const y = event.clientY; // Y position of click

    setAppState("setStar");

    // Set the position of the component to render
    setComponentPosition({ x, y });
  };

  useEffect(() => {
    socket.on("stars-update", (stars) => {
      setStars(JSON.parse(stars));
    });

    return () => {
      socket.off("stars-update");
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${nightSky})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      <div className="forest-skyline">
        <img src={forestSkyline} alt="forest skyline" />
      </div>
    </div>
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
