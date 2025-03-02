import { useState } from "react";
import { socket } from "../SocketFactory";
import "./About.css";

function About() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      {showAbout && (
        <div>
          <div className="headingAbout">A BRIGHTER FUTURE</div>
          <div className="subheading">Our Mission</div>
          <div className="description">
            We all need rest, and getting to make your own constellations seemed
            like a perfect solution.
          </div>
          <div className="description">
            Take a moment to sit and simply play with the stars :D
          </div>
          <div className="subheading">How It Works</div>
          <div className="description">
            1. Click anywhere on the night sky to place a star.
          </div>
          <div className="description">
            2. Customize your star by choosing its color, size, brightness, and
            making a wish.
          </div>
          <div className="description">3. Enjoy the cosmic view!</div>
        </div>
      )}
      <div
        className="aboutButton"
        onMouseEnter={() => setShowAbout(true)}
        onMouseLeave={() => setShowAbout(false)}
      >
        ?
      </div>
    </div>
  );
}

export default About;
