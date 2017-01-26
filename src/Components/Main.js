import React, { Component } from 'react'
import './Main.css'

import Clock from './Clock'

class Main extends Component {
  render () {
    return (
      <main>
        <Clock time={100} isDay={true} />
      </main>
    )
  }
}

export default Main
