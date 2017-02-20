import React, { PropTypes } from 'react'
import './Sun.css'

const Sun = ({ percent }) => {
  const sunHeight = Math.max(window.innerHeight * 4, window.innerWidth)

  // Sky brightens to blue bw 50 and 65
  const dayLevel = percent > 50 ? (percent - 50) / (65 - 50) : 0

  // Sky darkens to night bw 40 and 0
  const nightLevel = percent < 40 ? ((40 - percent) / 30) : 0

  // Dusk fades in between 50 and 40
  const duskLevel = percent < 50 ? (50 - percent) / (50 - 40) : 0

  const day = `radial-gradient(${sunHeight / 2}px at 50% center,
    rgba(255, 255, 255, ${dayLevel}),
    rgba(249, 247, 232, ${dayLevel}) 2%,
    rgba(179, 240, 247, ${dayLevel}) 4%,
    rgba(140, 216, 247, ${dayLevel}) 7%,
    rgba(135, 206, 235, ${dayLevel}) 10%,
    rgba(135, 206, 235, ${dayLevel}) 65%
  )`

  const sun = `radial-gradient(${sunHeight / 2}px at 50% center,
    #fff823,
    #ff9800 15%,
    #fd7a1c 25%,
    #fd5a1c 40%
  )`

  const sunStyles = {
    background: `${sun}`,
    height: sunHeight,
    top: `-${percent * 2}%`
  }

  const dayStyles = {
    background: `${day}`,
    height: sunHeight,
    top: `-${percent * 2}%`
  }

  const duskStyles = {
    opacity: duskLevel
  }

  const nightStyles = {
    opacity: nightLevel
  }

  return (
    <div className='sky'>
      {dayLevel < 1 &&
        <div className='sun' style={sunStyles} />
      }
      {dayLevel > 0 &&
        <div className='day' style={dayStyles} />
      }
      {duskLevel > 0 &&
        <div className='dusk' style={duskStyles} />
      }
      {nightLevel > 0 &&
        <div className='night' style={nightStyles} />
      }
    </div>
  )
}

const { number } = PropTypes

Sun.propTypes = {
  percent: number.isRequired
}

export default Sun
