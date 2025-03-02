import "./CustomizeStar.css";
import { useState } from "react";
import { socket } from "../SocketFactory";
import Star from "./Star";
import Slider from "@mui/material/Slider";

function CustomizeStar({ starX, starY, onAddStar }) {
  const [size, setSize] = useState(4);
  const [color, setColor] = useState("#ffffff");
  const [brightness, setBrightness] = useState(0.6);
  const [wish, setWish] = useState("");
  const maxCharacters = 100;

  function addStar() {
    const star = {
      x: starX,
      y: starY,
      size: size,
      color: color,
      brightness: brightness,
      wish: wish,
    };
    socket.emit("star-add", star);
    onAddStar();
  }

  const handleWishChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxCharacters) {
      setWish(input);
    }
  };

  return (
    <>
      <Star
        x={starX}
        y={starY}
        size={size}
        color={color}
        brightness={brightness}
        wish={wish}
      />
      <div className="container">
        <div className="popupBox">
          <div className="heading">Customize your star!</div>
          <div className="dropDownContainer">
            <div>
              Color:&nbsp;&nbsp;
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="#ffffff">Lunar Frost</option>
                <option value="#FFCB6C">Astral Gold</option>
                <option value="#FFACC6">Nebula Pink</option>
                <option value="#9880ff">Purple Cosmos</option>
                <option value="#A4FFFF">Celestial Cyan</option>
              </select>
            </div>
            <div className="sliderStyle size">
              <p>Size:&nbsp;&nbsp;</p>

              <Slider
                className="slider"
                size="small"
                value={size}
                color="#FFCB6C"
                min={5}
                max={10}
                onChange={(e) => setSize(e.target.value)}
              />
              {/* <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select> */}
            </div>
            <div className="sliderStyle bright">
              <p>Brightness:&nbsp;&nbsp;</p>

              <Slider
                className="slider"
                size="small"
                value={brightness}
                color="#FFCB6C"
                min={0.6}
                max={1}
                onChange={(e) => setBrightness(e.target.value)}
              />
            </div>

            <div className="wish">
              <p> Wish:&nbsp;&nbsp;</p>
              <div className="inputAndChars">
                <input
                  className="wishInput"
                  type="text"
                  value={wish}
                  onChange={handleWishChange}
                  maxLength={maxCharacters}
                />
                <div className="characterCount">
                  {wish.length}/{maxCharacters}
                </div>
              </div>
            </div>
          </div>
          <button className="submit" onClick={() => addStar()}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomizeStar;
