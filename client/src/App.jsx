import { useState } from 'react'
import { socket } from './SocketFactory'
import nightSky from './assets/night_sky.jpg';
import './App.css'

function App() {
  

  const [stars, setStars] = useState([]);
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
      style = {{
        backgroundImage: `url(${nightSky})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw'

    }}>
      </div>
  )
}

export default App
