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
    fetch('http://api.sunrise-sunset.org/json?lat=33.9319578&lng=-117.946175&formatted=0')
      .then(res => res.json())
      .then(json => {
        console.log(json)

        const { sunrise, sunset, day_length } = json.results

        this.setState({
          sunrise: toUTC(new Date(sunrise)),
          sunset: toUTC(new Date(sunset)),
          now: toUTC(new Date(Date.now())),
          dayLength: day_length
        })
      })
  }

  render () {
    const { sunrise, sunset, now } = this.state
    const timeLeft = sunset - now

    return (
      <main>
      </main>
    )
  }
}

export default Main
