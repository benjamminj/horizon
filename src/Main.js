import 'whatwg-fetch'

import React, { Component } from 'react'
import './Main.css'

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
    return (
      <main></main>
    )
  }

  isDay () {
    const { now, sunset } = this.state

    return (sunset - now) > 0
  }

  async getTimesForLocation () {
    const res = await fetch('http://ip-api.com/json')
    const { lat, lon } = await res.json()

    await this.getSunriseSunsetTimes(lat, lon)
  }

  async getSunriseSunsetTimes (lat, lng) {
    const res = await fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    const { results } = await res.json()

    const { sunrise, sunset, day_length } = results

    this.setState({
      sunrise: toUTC(new Date(sunrise)),
      sunset: toUTC(new Date(sunset)),
      now: toUTC(new Date(Date.now())),
      dayLength: day_length
    })

    console.log(this.state)
  }
}

export default Main
