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
    fetch('http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0')
      .then(res => res.json())
      .then(json => {
        this.setState({
          sunrise: new Date(json.results.sunrise)
        })
      })
  }

  render () {
    return (
      <main>{ JSON.stringify(this.state.sunrise, null, 4) }</main>
    )
  }
}

export default Main
