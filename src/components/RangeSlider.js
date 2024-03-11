import React from 'react'

const RangeSlider = (props) => {
  return (
    <div>
    <h3>{props.title} : {props.value} min</h3>
    {/* slider input */}
        <input
        min={props.min}
        max={props.max}
        type="range"
        value={props.value}
        onChange={props.onChange}
        />
  </div>

  )
}

export default RangeSlider