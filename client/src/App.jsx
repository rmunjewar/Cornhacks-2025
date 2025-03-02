import { useEffect, useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import corn from "./assets/corn.jpeg";
import cow from "./assets/cow.jpeg";
import ufo from "./assets/ufo.jpeg";
import astronaut from "./assets/astronaut.jpeg";
import galileo from "./assets/galileo.png";
import moon from "./assets/moon.jpeg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import Object from "./components/Object";
import forestSkyline from "./assets/forest-skyline.png";
import CustomizeStar from "./components/CustomizeStar";
import About from "./components/About";
import Timer from "./components/Timer";
import "./App.css";

const objectImages = [galileo, corn, cow, ufo, astronaut, moon];

// diff paths for objects
const PATH_TYPES = [
  "straight", //  straight line
  "wavy", // wavy pattern
  "downfall", //  downfall pattern
  "diagonal-up", //  diagonally upward
  "diagonal-down", //  diagonally downward
];

function App() {
  const [stars, setStars] = useState([]);
  const [floatingObjects, setFloatingObjects] = useState([]);
  const [appState, setAppState] = useState("view");
  const [showWelcome, setShowWelcome] = useState(true);

  const [showAboutButton, setShowAboutButton] = useState(false);
  const [superNova, setSuperNova] = useState(null);
  const [ifNova, setIfNova] = useState(false);

  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });
  const [supernova, setSupernova] = useState(null);


  let actualTimeRemaining = 0;
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [nextTimeout, setNextTimeout] = useState(0);

  function resetAppState() {
    setAppState("timeout");
    actualTimeRemaining = nextTimeout;
    setTimeRemaining(actualTimeRemaining);
    setTimeout(decreaseTimer, 1000);
  }

  function decreaseTimer() {
    if (actualTimeRemaining > 2000) {
      actualTimeRemaining -= 1000;
      setTimeRemaining(actualTimeRemaining);
      setTimeout(decreaseTimer, 1000);
    } else {
      setAppState("view");
      actualTimeRemaining = 0;
      setTimeRemaining(actualTimeRemaining);
    }
  }

  const createFloatingObject = () => {
    // this is to generate a random height
    const randomY = Math.floor(Math.random() * 80) + 5;
    const randomImageIndex = Math.floor(Math.random() * objectImages.length);

    const sides = ["left", "right"];
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    const randomPathType =
      PATH_TYPES[Math.floor(Math.random() * PATH_TYPES.length)];

    let startX, startY, direction;

    // choosing random left or right side for object
    if (randomSide === "left") {
      startX = -5;
      startY = randomY;
      direction = "right";
    } else {
      startX = 105;
      startY = randomY;
      direction = "left";
    }

    // create new object
    const newObject = {
      id: Date.now(),
      image: objectImages[randomImageIndex],
      x: startX,
      y: startY,
      direction: direction,
      pathType: randomPathType,
      speed: Math.random() * 0.5 + 0.2,
      amplitude: Math.random() * 2 + 1,
      frequency: Math.random() * 0.1 + 0.05,
      phase: 0,
      originalY: startY,
      rotation: 0,
      rotationSpeed: Math.random() * 2 - 1,
    };

    setFloatingObjects((prevObjects) => [...prevObjects, newObject]);
  };

  // updating properties of object, new x and y
  const updateFloatingObjects = () => {
    setFloatingObjects((prevObjects) => {
      return prevObjects
        .map((obj) => {
          // calc new x
          let newX = obj.x;
          if (obj.direction === "right") {
            newX = obj.x + obj.speed;
          } else {
            newX = obj.x - obj.speed;
          }

          // calc new y
          let newY = obj.y;
          let newPhase = obj.phase + obj.frequency;
          let newRotation = obj.rotation + obj.rotationSpeed;

          // choosing path time, this is calc next step
          switch (obj.pathType) {
            case "wavy":
              // SINE WAVEEEEE
              newY = obj.originalY + Math.sin(newPhase) * obj.amplitude;
              break;
            case "downfall":
              newY = obj.y - 0.9;
              break;
            case "diagonal-up":
              newY = obj.y - 0.25;
              break;
            case "diagonal-down":
              newY = obj.y + 0.25;
              break;
            default:
              break;
          }

          // returning new object
          return {
            ...obj,
            x: newX,
            y: newY,
            phase: newPhase,
            rotation: newRotation,
          };
        })
        .filter((obj) => {
          if (obj.direction === "right") {
            return obj.x < 105; // remove fromm screen left
          } else {
            return obj.x > -5; // remove from screen right
          }
        });
    });
  };

  useEffect(() => {
    // using interval effect
    const createInterval = setInterval(createFloatingObject, 40000);

    createFloatingObject();

    return () => clearInterval(createInterval);
  }, []);

  useEffect(() => {
    // using move interval effect
    const moveInterval = setInterval(updateFloatingObjects, 50);
    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(false);
      setShowAboutButton(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (event) => {
    if (appState === "view") {
      const x = event.clientX;
      const y = event.clientY;

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
      setNextTimeout(timeout);
      setTimeRemaining(timeRemaining);
    });

    socket.on("shooting-star", (shootingStar) => {
      setFloatingObjects((prevObjects) => [...prevObjects, shootingStar]);
    });
    socket.on("supernova", (supernova) => {
      setSupernova(supernova);
      setTimeout(() => setSupernova(null), 4000);
    });
    socket.on("ufo", (ufo) => {
      setFloatingObjects((prevObjects) => [...prevObjects, ufo]);
    });

    // this is to clean up all the event listeners after use
    return () => {
      socket.off("stars-update");
      socket.off("timeout-update");
      socket.off("shooting-star");
      socket.off("supernova");
      socket.off("ufo");
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
        zIndex: 0,
      }}
      onClick={handleClick}
    >
      <div
        className="forest-skyline"
        style={{
          width: "105vw",
          left: "-2.5vw",
          position: "absolute",
          bottom: 0,
          zIndex: 2,
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
      {showAboutButton && <About />}

      <RenderObjects objects={floatingObjects} />
      {supernova != null && (
        <Star
          size={supernova.size}
          color={supernova.color}
          brightness={supernova.brightness}
          x={supernova.x}
          y={supernova.y}
          supernova={true}
        />
      )}

      <RenderStars stars={stars} />
    </div>
  );
}

function RenderObjects({ objects }) {
  return (
    <div>
      {objects.map((object, index) => (
        <Object
          key={object.id || index}
          image={object.image}
          x={object.x}
          y={object.y}
          rotation={object.rotation}
        />
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
          supernova={false}
        />
      ))}
    </div>
  );
}

export default App;
