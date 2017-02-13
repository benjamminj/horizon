/* eslint-disable */
import React, { PropTypes } from 'react'
import './Sun.css'

const Sun = ({ percent }) => {
  const sunHeight = Math.max(window.innerHeight * 4, window.innerWidth)

  // Sky brightens to blue bw 50 and 70
  const dayLevel = percent > 50 ? (percent - 50) / (65 - 50) : 0

  // Sky darkens to night bw 30 and 0
  const nightLevel = percent < 30 ? ((30 - percent) / 30) : 0
  const duskLevel = percent < 50 ? (50 - percent) / (50 - 30) : 0

  const day = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(255, 255, 255, ${dayLevel}),
    rgba(249, 247, 232, ${dayLevel}) 2%,
    rgba(179, 240, 247, ${dayLevel}) 4%,
    rgba(140, 216, 247, ${dayLevel}) 7%,
    rgba(135, 206, 235, ${dayLevel}) 10%,
    rgba(135, 206, 235, ${dayLevel}) 65%
  )`

  const night = `linear-gradient(rgba(0, 0, 0, ${nightLevel}), rgba(0, 0, 0, ${nightLevel}))`

  const dusk = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(102, 79, 119, ${duskLevel / 2}),
    rgba(45, 67, 101, ${duskLevel}) 30%,
    rgba(48, 69, 86, ${duskLevel}) 50%
  )`

  const sun = `radial-gradient(${sunHeight / 2}px at 50% center,
    #fff823,
    #ff9800 15%,
    #fd7a1c 25%,
    #fd5a1c 40%
  )`

  const stylesObj = {
    background: `${day}, ${night}, ${dusk}, ${sun}`,
    height: sunHeight,
    top: `-${percent * 2}%`
  }

  return (
    <div className='sun' style={stylesObj} />
  )
}

const { number } = PropTypes

Sun.propTypes = {
  percent: number.isRequired
}

export default Sun
