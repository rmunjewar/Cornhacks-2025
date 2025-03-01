import { useState } from 'react'
import { socket } from './SocketFactory'
import nightSky from './assets/night_sky.jpg';
import './App.css'

function App() {
  
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
