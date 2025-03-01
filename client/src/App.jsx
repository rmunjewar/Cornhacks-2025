import { useEffect, useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import "./App.css";

function App() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    socket.on('stars-update', (stars)) {
      setStars(JSON.parse(stars))
    }
  })
  
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
