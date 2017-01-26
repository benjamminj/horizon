import React, { Component, PropTypes } from 'react'
import './Clock.css'

class Clock extends Component {
  render () {
    this.formatTimeDisplay()

    return (
      <div>{ this.props.time / (1000 * 60 * 60) }</div>
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

const { number } = PropTypes

Clock.propTypes = {
  time: number
}

export default Clock
