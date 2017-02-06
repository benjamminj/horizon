/* eslint-disable */
import React, { Component, PropTypes } from 'react'
import './App.css'


import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

import Sun from './Sun'

class App extends Component {
  async componentDidMount () {
    const appLoaded = await this.props.onAppLoad()

    if (appLoaded && this.props.target) {
      console.log(this.props.breakpoints, this.props.target)

      this.props.startTimer(this.props.breakpoints[this.props.target].time)
    }
  }

  componentWillUpdate () {
    console.log('updating?')
  }

  render () {
    const { loaded } = this.props

    const styles = {
      background: loaded ? 'skyblue' : 'rgba(255, 255, 255, 0.3)'
    }

    return (
      <div id="app" style={styles}>
        {loaded &&
          <Sun
          percent={75}
          nightLevel={0.5} />
        }

        <Header></Header>
        <main>
          {loaded &&
            <ClockContainer />
          }
        </main>
        <Footer></Footer>
      </div>
    )
  }
}

const { bool, func, array, number } = PropTypes

App.propTypes = {
  loaded: bool,
  onAppLoad: func,
  startTimer: func,
  breakpoints: array,
  target: number
}

export default App
