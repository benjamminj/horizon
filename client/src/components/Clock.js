import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  componentDidMount () {
    const { now, startCount, isLoading, loadSuccess } = this.props

    if (!isLoading && loadSuccess) {
      startCount(now)
    }
  }

  render () {
    const { timeLeft } = this.props
    const { hours, minutes, seconds } = this.formatTimeDisplay()

    const timeDisplay = timeLeft ? <h1>{hours}:{minutes}:{seconds}</h1> : <h1 />

    return (
      <div className='time-display'>
        Time until { this.props.day ? 'sunset' : 'sunrise' }:
        {timeDisplay}
      </div>
    )
  }

  formatTimeDisplay () {
    const { timeLeft } = this.props
    const { padNumber } = this

    const hours = timeLeft / (1000 * 60 * 60)
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

const { bool, number, func } = PropTypes

Clock.propTypes = {
  day: bool.isRequired,
  timeLeft: number,
  now: number,
  startCount: func,
  isLoading: bool.isRequired,
  loadSuccess: bool.isRequired
}

export default Clock
