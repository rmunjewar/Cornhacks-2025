import { useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import corn from "./assets/corn.jpeg";
import cow from "./assets/cow.jpeg";
import ufo from "./assets/ufo.jpeg";
import astronaut from "./assets/astronaut.jpeg";
import moon from "./assets/moon.jpeg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import "./App.css";

const floatingObjects = [corn, cow, ufo, astronaut, moon];

function App() {
  const [floatingObjects, setFloatingObjects] = useState([]);

  const [stars, setStars] = useState([]);

  useEffect(() => {
    socket.on("stars-update", stars);
    {
      setStars(JSON.parse(stars));
    }
  });

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

export default App;
