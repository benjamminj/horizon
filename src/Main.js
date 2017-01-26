import 'whatwg-fetch'

import React, { Component } from 'react'
import './Main.css'

import Clock from './Clock'
import { toUTC } from './Utils'

const { fetch } = window

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getTimesForLocation()
  }

  render () {
    const { sunset, sunrise, now } = this.state

    return (
      <main>
        <Clock time={this.isDay() ? sunset - now : sunrise - now} isDay={this.isDay()} />
      </main>
    )
  }

  async getTimesForLocation () {
    const res = await fetch('http://ip-api.com/json')
    const { lat, lon } = await res.json()

    await this.getSunriseSunsetTimes(lat, lon)
  }

  async getSunriseSunsetTimes (lat, lng) {
    const res = await fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    const { results } = await res.json()

    this.setState({
      civilTwilightBegin: toUTC(new Date(results.civil_twilight_begin)),
      civilTwilightEnd: toUTC(new Date(results.civil_twilight_end)),
      sunrise: toUTC(new Date(results.sunrise)),
      sunset: toUTC(new Date(results.sunset)),
      now: toUTC(new Date(Date.now())),
      dayLength: results.day_length * 1000
    })
  }

  isDay () {
    const { now, civilTwilightBegin, civilTwilightEnd } = this.state

    return (civilTwilightBegin - now) < 0 && (civilTwilightEnd - now) > 0
  }
}

export default Main
