import { useState } from "react"
import { socket } from "./SocketFactory"
import nightSky from "./assets/night_sky.jpg";
import corn from './assets/corn.jpg';
import cow from './assets/cow.jpg';
import ufo from './assets/ufo.jpg';
import astronaut from './assets/astronaut.jpg';
import moon from './assets/moon.jpg';
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import './App.css'

const floatingObjects = [corn, cow, ufo, astronaut, moon]

function App() {

  const [floatingObjects, setFloatingObjects] = useState([]);
  
  const [stars, setStars] = useState([])

  useEffect(() => {
    socket.on('stars-update', (stars)) {
      setStars(JSON.parse(stars))
    }
  })
  
  return (

    <div 
      style = {{
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
