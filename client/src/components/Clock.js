import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  componentDidMount () {
    const { getTimeLeft, status, times, location } = this.props
    const { sunrise, sunset, now } = times
    const { isDay } = status
    const { lat, lng } = location

    getTimeLeft({ isDay, sunrise, sunset, now, lat, lng })

    this.getInitialLightLevel()
  }

  componentDidUpdate (prev) {
    const { increaseCount, times } = this.props

    if (times.timeLeft) {
      increaseCount(times)
    }

    this.checkForLightLevelChange()
  }

  render () {
    const { status, times } = this.props

    const { isDay } = status
    const { timeLeft } = times
    const { hours, minutes, seconds } = this.formatTimeDisplay()

    const timeDisplay = timeLeft ? <h1>{hours}:{minutes}:{seconds}</h1> : <h1 />

    return (
      <div className='time-display'>
        Time until { isDay ? 'sunset' : 'sunrise' }:
        {timeDisplay}
      </div>
    )
  }

  checkForLightLevelChange () {
    const { now, sunset, sunrise, civilTwilightBegin, civilTwilightEnd } = this.props.times
    // const { isDay } = this.props.status

    const sunriseEnd = sunrise + (1000 * 60 * 5)
    const sunsetEnd = sunset + (1000 * 60 * 5)

    const breakpoints = [civilTwilightBegin, sunrise, sunriseEnd, sunset, sunsetEnd, civilTwilightEnd]

    return breakpoints.findIndex((breakpoint) => now === breakpoint)
  }

  getInitialLightLevel () {
    const { now, sunset, sunrise, civilTwilightBegin, civilTwilightEnd } = this.props.times

    const sunriseEnd = sunrise + (1000 * 60 * 5)
    const sunsetEnd = sunset + (1000 * 60 * 5)

    const breakpoints = [civilTwilightBegin, sunrise, sunriseEnd, sunset, sunsetEnd, civilTwilightEnd]
    const lightLevels = ['AM_CIVIL_TWILIGHT', 'SUNRISE', 'DAY', 'SUNSET', 'PM_CIVIL_TWILIGHT', 'NIGHT']

    const level = breakpoints.findIndex((breakpoint, i, arr) => {
      return (breakpoint < now) && (now < arr[i + 1])
    })

    return lightLevels[level]
  }

  formatTimeDisplay () {
    const { timeLeft } = this.props.times

    const hours = timeLeft / (1000 * 60 * 60)
    const minutes = (hours % 1) * 60
    const seconds = (minutes % 1) * 60

    const { padNumber } = this

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

const { func, object } = PropTypes

Clock.propTypes = {
  changeLightLevel: func.isRequired,
  getTimeLeft: func.isRequired,
  increaseCount: func,
  status: object.isRequired,
  times: object.isRequired,
  location: object.isRequired
}

export default Clock
