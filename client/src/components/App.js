import React, { Component, PropTypes } from 'react'

import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'
import Header from './Header'
import SunContainer from '../containers/SunContainer'

import './App.css'

class App extends Component {
  async componentDidMount () {
    const appLoaded = await this.props.onAppLoad()

    if (appLoaded && this.props.target) {
      const { breakpoints, startTimer, target } = this.props

      startTimer(breakpoints[target].time)
    }
  }

  render () {
    const { loaded } = this.props

    const styles = {
      background: loaded ? 'skyblue' : 'rgba(255, 255, 255, 0.3)'
    }

    return (
      <div id='app' style={styles}>
        <Header />
        <main>
          {loaded &&
            <ClockContainer />
          }
        </main>
        <Footer />
        {loaded &&
          <SunContainer />
        }
      </div>
    )
  }
}

const { array, bool, func, number } = PropTypes

App.propTypes = {
  breakpoints: array,
  loaded: bool,
  onAppLoad: func,
  startTimer: func,
  target: number
}

export default App
