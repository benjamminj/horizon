/* eslint-disable */
import React, { Component, PropTypes } from 'react'
import './Clock.css'

export default ({ now, breakpoints: bps, currentIndex: i }) => {
  const isWaiting = /^waiting/g.test(bps[i].status)

  const pad = (num) => (`0${Math.floor(num)}`).slice(-2)

  const hours = bps[i].time / (1000 * 60 * 60)
  const minutes = (hours % 1) * 60
  const seconds = (minutes % 1) * 60

  return (
    <div className="time-display">
      <h6>{ isWaiting ? `Time until ${bps[i + 1].status}` : `${bps[i].status} is happening! Go outside and see`}</h6>
      {isWaiting &&
        <h1>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</h1>

      }
    </div>
  )
}
