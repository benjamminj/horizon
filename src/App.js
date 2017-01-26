import React, { Component } from 'react'
import 'whatwg-fetch'

import { toUTC } from './Utils'
import './App.css'

import Header from './components/Header'
import Clock from './components/Clock'
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
        <main>
          <Clock timeLeft={timeLeft} isDay={this.isDay()} />
        </main>
        <Footer />
      </div>
    )
  }

  async getSunriseSunsetTimes (lat, lng) {
    const res = await fetch(`//api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    console.log(res)
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
    const res = await fetch('//ip-api.com/json')
      .then(this.processStatus)
      .catch()
    console.log(res)
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

  processStatus (res) {
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  }
}

export default App
