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
import Object from "./components/Object";
import forestSkyline from "./assets/forest-skyline.png";
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";

import { exampleStars } from "./ExampleStars";

const floatingObjects = [corn, cow, ufo, astronaut, moon];

function App() {
  const [stars, setStars] = useState(exampleStars);
  const [floatingObjects, setFloatingObjects] = useState([]);
  const [componentPosition, setComponentPosition] = useState(null);
  const [appState, setAppState] = useState("view");

  const [size, setSize] = useState("medium");
  const [color, setColor] = useState("#ffffff");
  const [brightness, setBrightness] = useState("medium");

  let setStar = false;
  const [showWelcome, setShowWelcome] = useState(true);

  if (appState === "setStar") {
    setStar = true;
  }

  // Function to handle the click event
  const handleClick = (event) => {
    if (showWelcome) {
      setShowWelcome(false);
      setAppState("view");
      return;
    }
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

      {setStar && (
        <CustomizeStar
          size={size}
          setSize={setSize}
          brightness={brightness}
          setBrightness={setBrightness}
          color={color}
          setColor={setColor}
        />
      )}
      {showWelcome && <Welcome />}
      <renderObjects objects={floatingObjects} />
      <renderStars stars={stars} />
    </div>
  );
}

function renderObjects(objects) {
  return (
    <div>
      {objects.map((object, index) => (
        <Object image={object.image} />
      ))}
    </div>
  );
}

function renderStars(stars) {
  return (
    <div>
      {stars.map((star, index) => (
        <Star
          size={star.size}
          color={star.color}
          brightness={star.brightness}
          x={star.x}
          y={star.y}
        ></Star>
      ))}
    </div>
  );
}

export default App;
