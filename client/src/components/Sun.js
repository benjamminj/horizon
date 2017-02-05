/* eslint-disable */
import React, { PropTypes } from 'react'
import './Sun.css'

const Sun = ({ percent, nightLevel }) => {
  const sunHeight = Math.max(window.innerHeight * 4, window.innerWidth)

  const dayLevel = (percent - 50) / (75 - 50) // Sky brightens to blue bw 50 and 75

  const daySky = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgb(255, 255, 255),
    rgba(249, 247, 232, ${dayLevel}) 2%,
    rgba(179, 240, 247, ${dayLevel}) 4%,
    rgba(140, 216, 247, ${dayLevel}) 7%,
    rgba(135, 206, 235, ${dayLevel}) 10%,
    rgba(135, 206, 235, ${dayLevel}) 65%)`

  const sun = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgb(255, 255, 255),
    rgb(249, 247, 232) 2%,
    rgb(255, 237, 170) 4%,
    rgb(247, 199, 101) 7%,
    rgb(249, 187, 73) 10%,
    rgb(245, 173, 66) 13%,
    rgb(245, 160, 73) 15%,
    rgb(236, 147, 93) 18%,
    rgb(234, 137, 107) 20%,
    rgb(206, 92, 74) 30%,
    rgb(162, 93, 96) 40%,
    rgb(66, 120, 144) 50%,
    rgb(56, 130, 195) 60%)`

  const night = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, ${nightLevel}) 30%)`

  const stylesObj = {
    background: `${daySky}, ${night}, ${sun}`,
    height: sunHeight,
    top: `-${percent * 2}%`
  }

  return (
    <div className='sun' style={stylesObj} />
  )
}

const { number } = PropTypes

Sun.propTypes = {
  percent: (props, propName) => props[propName] <= 100 ? null : new Error(`${propName} must be less than or equal to 150`),
  nightLevel: number.isRequired
}

export default Sun
