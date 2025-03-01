import { useState } from "react"
import { socket } from "./SocketFactory"
import nightSky from "./assets/night_sky.jpg";
import nightSky from './assets/corn.jpg';
import nightSky from './assets/cow.jpg';
import nightSky from './assets/ufo.jpg';
import nightSky from './assets/astronaut.jpg';
import nightSky from './assets/moon.jpg';
import Welcome from "./components/Welcome";
import Star from "./components/Star";
<<<<<<< HEAD
import './App.css'
=======
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";
>>>>>>> 59ae408f19c59d4f5dee66a57bae13b1bd405aeb

function App() {

  const [floatingObjects, setFloatingObjects] = useState([]);
  
  return (
<<<<<<< HEAD

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
=======
    <div></div>
>>>>>>> 59ae408f19c59d4f5dee66a57bae13b1bd405aeb
  );
}

export default App;
