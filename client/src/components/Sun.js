/* eslint-disable */
import React, { PropTypes } from 'react'
import './Sun.css'

const Sun = ({ percent }) => {
  const sunHeight = Math.max(window.innerHeight * 4, window.innerWidth)

  // Sky brightens to blue bw 50 and 70
  const dayLevel = percent > 50 ? (percent - 50) / (70 - 50) : 0
  const nightLevel = percent < 50 ? ((50 - percent) / 50) : 0

  const day = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(255, 255, 255, ${dayLevel}),
    rgba(249, 247, 232, ${dayLevel}) 2%,
    rgba(179, 240, 247, ${dayLevel}) 4%,
    rgba(140, 216, 247, ${dayLevel}) 7%,
    rgba(135, 206, 235, ${dayLevel}) 10%,
    rgba(135, 206, 235, ${dayLevel}) 65%)`

  const sun = `radial-gradient(${sunHeight / 2}px at 50% center,
    #fff823,
    #ff9800 15%,
    #fd7a1c 25%,
    #fd5a1c 40%
  )`

  const night = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(49, 0, 0, ${nightLevel}),
    rgba(0, 20, 50, ${nightLevel}) 30%,
    rgba(0, 20, 50, ${nightLevel}) 50%)`

  const stylesObj = {
    background: `${day}, ${night}, ${sun}`,
    height: sunHeight,
    top: `-${percent * 2}%`
  }

  return (
    <div className='sun' style={stylesObj} />
  )
}

Sun.propTypes = {
  percent: (props, propName) => props[propName] <= 100 ? null : new Error(`${propName} must be less than or equal to 100`)
}

export default Sun
