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
import forestSkyline from "./assets/forest-skyline.png"
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";

const floatingObjects = [corn, cow, ufo, astronaut, moon];

function App() {
  // const [floatingObjects, setFloatingObjects] = useState([]);

  const [stars, setStars] = useState([]);
  
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
        position: 'relative',
        minHeight: "100vh",
        width: "100vw",
        overflow: 'hidden'
      }}
    >

    <div className="forest-skyline">
      <img src={forestSkyline} alt="forest skyline" />
    </div>

    </div>
  );
}

export default App;
