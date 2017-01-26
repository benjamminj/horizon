import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  render () {
    const { hours, minutes, seconds } = this.formatTimeDisplay()

    return (
      <div>
        Time until { this.props.isDay ? 'sunset' : 'sunrise' }:
        <h1>
          {hours || null}:{minutes || null}:{seconds || null}
        </h1>
      </div>
    )
  }

  formatTimeDisplay () {
    const { time } = this.props

    const hours = time / (1000 * 60 * 60)
    const minutes = (hours % 1) * 60
    const seconds = (minutes % 1) * 60

    return {
      hours: Math.floor(hours),
      minutes: Math.floor(minutes),
      seconds: Math.floor(seconds)
    }
  }
}

const { bool, number } = PropTypes

Clock.propTypes = {
  isDay: bool,
  time: number
}

export default Clock
