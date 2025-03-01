import { useState } from "react";
import { socket } from "../SocketFactory";
import "./About.css";

function About() {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div>
            <div className="popUp" hidden={!showAbout}>
                <div className="heading">
                    A BRIGHTER FUTURE
                </div>
                <div className="subheading">
                    Our Mission
                </div>
                <div className="description">
                    mission statement here
                </div>
                <div className="subheading">
                    How It Works
                </div>
                <div className="description">
                    instructions here
                </div>
            </div>
            
                <div className="aboutButton" onClick={() => setShowAbout(!showAbout)}>
                    ?
                </div>
           
        </div>
    );
}

export default About;