import React, { Component, PropTypes } from 'react'
import './Main.css'

import Clock from './Clock'

class Main extends Component {
  render () {
    return (
      <main>
        <Clock timeLeft={this.props.timeLeft} isDay={this.props.isDay} />
      </main>
    )
  }
}

const { bool, number } = PropTypes

Main.propTypes = {
  isDay: bool,
  timeLeft: number
}

export default Main
