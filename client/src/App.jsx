import { useState } from "react";
import { socket } from "./SocketFactory";
import Welcome from "./components/Welcome";
import Star from "./components/Star";
import "./App.css";

function App() {
  return (
    <>
      <Star size="large" color="blue" brightness="large"></Star>
    </>
  );
}

export default App;
