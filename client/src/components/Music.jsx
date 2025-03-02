import { useRef } from "react";
import { useState } from "react";
import "./Music.css";

function Music() {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(true);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause(); // Pause audio
      } else {
        audioRef.current.play(); // Start audio playback
      }
      setPlay(!play); // Toggle the play state
    }
  };

  return (
    <div>
      <button className="playMusic" onClick={handlePlayMusic}>
        {play && <img src="./assets/sound-off.svg" />}
        {!play && <img src="./assets/sound-high.svg" />}
      </button>
      <audio
        ref={audioRef}
        src="./assets/background-music.mp3"
        type="audio/mp3"
        preload="auto" // Ensures the audio is loaded
      ></audio>
    </div>
  );
}

export default Music;
