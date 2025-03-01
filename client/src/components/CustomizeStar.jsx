import './CustomizeStar.css'
import { useState } from "react";

function CustomizeStar(size, setSize, color, setColor, brightness, setBrightness) {

    return (
        <>
            <div className='popupBox'>
                <div className='heading'>Customize your star!</div>
                <div className='dropdownContainer'>
                    Color: 
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="#ffffff">white</option>
                        <option value="#FFCB6C">gold</option>
                        <option value="#FFACC6">pink</option>
                        <option value="#B764FF">purple</option>
                        <option value="#A4FFFF">cyan</option>
                    </select>
                </div>
                <div className='dropdownContainer'>
                    Size: 
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div className='dropdownContainer'>
                    Brightness: 
                    <select value={brightness} onChange={(e) => setBrightness(e.target.value)}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
            </div >
        </>
    )
}

export default CustomizeStar