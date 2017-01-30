import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  componentDidMount () {
    const { getTimeLeft, times } = this.props

    getTimeLeft(times)
  }

  componentDidUpdate () {
    const { increaseCount, times } = this.props

    increaseCount(times)
  }

  render () {
    const { timeLeft } = this.props.times
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
    const { timeLeft } = this.props.times
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

const { bool, number, func, object } = PropTypes

Clock.propTypes = {
  day: bool.isRequired,
  timeLeft: number,
  now: number,
  increaseCount: func,
  isLoading: bool.isRequired,
  loadSuccess: bool.isRequired,
  getTimeLeft: func.isRequired,
  times: object.isRequired
}

export default Clock
