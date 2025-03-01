import { useState } from "react";
import { socket } from "../SocketFactory";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="box">
      <h2>Welcome!</h2>
      <p>Click to add your stars to the sky!</p>
    </div>
  );
}

export default Welcome;
