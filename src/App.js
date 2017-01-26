import React, { Component } from 'react'
import 'whatwg-fetch'

import { toUTC } from './Utils'
import './App.css'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const { fetch } = window

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getTimesForLocation()

    this.countdown()
  }

  render () {
    const { timeLeft } = this.state

    return (
      <div>
        <Header />
        <Main timeLeft={timeLeft} isDay={this.isDay()} />
        <Footer />
      </div>
    )
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

    this.getTimeLeft()
  }

  async getTimesForLocation () {
    const res = await fetch('http://ip-api.com/json')
    const { lat, lon } = await res.json()

    await this.getSunriseSunsetTimes(lat, lon)
  }

  countdown () {
    return window.setInterval(() => {
      this.setState({
        timeLeft: this.state.timeLeft - 1000
      })
    }, 1000)
  }

  getTimeLeft () {
    const { sunrise, sunset, now } = this.state

    this.setState({
      timeLeft: this.isDay() ? sunset - now : sunrise - now
    })
  }

  isDay () {
    const { now, civilTwilightBegin, civilTwilightEnd } = this.state

    return (civilTwilightBegin - now) < 0 && (civilTwilightEnd - now) > 0
  }
}

export default App
