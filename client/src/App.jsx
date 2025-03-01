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
import Timer from "./components/Timer";
import "./App.css";

import { exampleStars } from "./ExampleStars";

const objectImages = [corn, cow, ufo, astronaut, moon];

function App() {
  const [stars, setStars] = useState([]);
  const [floatingObjects, setFloatingObjects] = useState([]);
  const [appState, setAppState] = useState("view");
  const [showWelcome, setShowWelcome] = useState(true);
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });
  const [timeRemaining, setTimeRemaining] = useState(0);

  function resetAppState() {
    setAppState("view");
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (event) => {
    if (appState === "view") {
      const x = event.clientX; // X position of click in pixels
      const y = event.clientY; // Y position of click in pixels

      // Get the viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const xInVW = (x / viewportWidth) * 100;
      const yInVH = (y / viewportHeight) * 100;

      setStarPosition({ x: xInVW, y: yInVH });
      setAppState("star");
    }
  };

  useEffect(() => {
    socket.on("stars-update", (stars) => {
      setStars(JSON.parse(stars));
    });
    socket.on("timeout-update", (timeout) => {
      
    })

    socket.on("shooting-star", (shootingStar) => {
      setFloatingObjects([...floatingObjects, shootingStar]);
    });
    socket.on("supernova", (supernova) => {
      // hmmm
    });
    socket.on("ufo", (ufo) => {
      setFloatingObjects([...floatingObjects, ufo]);
    });
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
        zIndex: 0,
      }}
      onClick={handleClick}
    >
      <div
        className="forest-skyline"
        style={{
          width: "105vw",
          left: "-2.5vw",
        }}
      >
        <img
          src={forestSkyline}
          alt="forest skyline"
          style={{
            width: "105vw",
          }}
        />
      </div>

      {appState === "star" && (
        <CustomizeStar
          starX={starPosition.x}
          starY={starPosition.y}
          onAddStar={resetAppState}
        />
      )}
      {showWelcome && <Welcome />}
      <Timer timeLeft={timeRemaining} />

      <RenderObjects objects={floatingObjects} />
      <RenderStars stars={stars} />
    </div>
  );
}

function RenderObjects({ objects }) {
  return (
    <div>
      {objects.map((object, index) => (
        <Object key={index} image={object.image} x={object.x} y={object.y} />
      ))}
    </div>
  );
}

function RenderStars({ stars }) {
  return (
    <div>
      {stars.map((star, index) => (
        <Star
          key={index}
          size={star.size}
          color={star.color}
          brightness={star.brightness}
          x={star.x}
          y={star.y}
        />
      ))}
    </div>
  );
}

export default App;
