import { useState } from "react";
import { socket } from "./SocketFactory";
import nightSky from "./assets/night_sky.jpg";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
<<<<<<< Updated upstream
import CustomizeStar from "./components/CustomizeStar";
import "./App.css";

function App() {
=======
import "./App.css";

function App() {
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

>>>>>>> Stashed changes
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
      onClick={handleClick}
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
