import './CustomizeStar.css'
import { useState } from "react";

function CustomizeStar(size, setSize, color, setColor, brightness, setBrightness) {

    return (
        <>
            <div className='container'>
                <div className='popupBox'>
                    <div className='heading'>Customize your star!</div>
                    <div className='dropDownContainer'>
                        <div>
                            Color:
                            <select value={color} onChange={(e) => setColor(e.target.value)}>
                                <option value="#ffffff">Lunar Frost</option>
                                <option value="#FFCB6C">Astral Gold</option>
                                <option value="#FFACC6">Nebula Pink</option>
                                <option value="#B764FF">Purple Cosmos</option>
                                <option value="#A4FFFF">Celestial Cyan</option>
                            </select>
                        </div>
                        <div>
                            Size:
                            <select value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div>
                            Brightness:
                            <select value={brightness} onChange={(e) => setBrightness(e.target.value)}>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}

export default CustomizeStar