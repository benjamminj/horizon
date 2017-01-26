import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  render () {
    const { time } = this.props
    const { hours, minutes, seconds } = this.formatTimeDisplay()

    const timeDisplay = time ? <h1>{hours}:{minutes}:{seconds}</h1> : <h1 />

    return (
      <div className='time-display'>
        Time until { this.props.isDay ? 'sunset' : 'sunrise' }:
        {timeDisplay}
      </div>
    )
  }

  formatTimeDisplay () {
    const { time } = this.props
    const { padNumber } = this

    const hours = time / (1000 * 60 * 60)
    const minutes = (hours % 1) * 60
    const seconds = (minutes % 1) * 60

    return {
      hours: padNumber(Math.floor(hours)),
      minutes: padNumber(Math.floor(minutes)),
      seconds: padNumber(Math.floor(seconds))
    }
  }

  padNumber (number) {
    return (`0${number}`).slice(-2)
  }
}

const { bool, number } = PropTypes

Clock.propTypes = {
  isDay: bool,
  time: number
}

export default Clock
