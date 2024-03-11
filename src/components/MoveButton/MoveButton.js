import { useState } from 'react';
import React from 'react'
import './MoveButton.css'
import sound from './pi.mp3'

const MoveButton = () => {
    const [count, setCount] = useState(0)
    const audio = new Audio(sound);
    audio.volume = 0.3;
    let top = "100px";
    let left = "0%";

    const move = () => {
        audio.play().then(() => {
            console.log("Audio started!")
        })
        left = Math.floor(Math.random()*120)-60 + "%"
        top = Math.floor(Math.random()*750) + "px"
        document.documentElement.style.setProperty('--top', top)
        document.documentElement.style.setProperty('--left', left)
        setCount(count + 1)
    }

  return (
    <>
        <div>
            <button className='button' onClick={move}>押してみて！</button>
        </div>
        
    </>
  )
}
export default MoveButton