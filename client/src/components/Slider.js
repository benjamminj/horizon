import React from 'react'

function onInput (e) {
  console.log(e.target.value)
}

function onMouseDown (e) {
  console.log(`mouse down -- pause the percent & set to ${e.target.value}`)
}

function onMouseUp (e) {
  console.log('mouse up -- resume the regular position')
}

function Slider (props) {
  return (
    <div id='slider'>
      <input
        min='0'
        max='100'
        type='range'
        onInput={onInput}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </div>
  )
}

export default Slider
