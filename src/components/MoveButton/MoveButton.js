import React from 'react'
import './MoveButton.css'
import sound from './pi.mp3'

const MoveButton = () => {

    const audio = new Audio(sound);
    audio.volume = 0.3;
    let top = "100px";
    let left = "10%";
    var random_top = 0;
    var random_left = 0;

    const move = () => {
        audio.play().then(() => {
            console.log("Audio started!")
        })
        random_top = Math.floor(Math.random()*101)
        random_left = Math.floor(Math.random()*300)
        
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