import { useRef } from "react";
import { useState } from "react";
import "./Music.css";

function Music() {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(true);

  const handlePlayMusic = () => {
    if (audioRef.current && play) {
      audioRef.current.play(); // Start audio playback
      setPlay(false);
    } else {
      audioRef.current.pause();
      setPlay(true);
    }
  };

  return (
    <div>
      <button className="playMusic" onClick={handlePlayMusic}>
        Play Music
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
