/* eslint-disable */
import React, { Component, PropTypes } from 'react'
import './App.css'


import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

import Clock from '../components/Clock'

class App extends Component {
  async componentDidMount () {
    const appLoaded = await this.props.onAppLoad()

    if (appLoaded) {
      console.log(this.props.breakpoints[this.props.target])

      this.props.startTimer(this.props.breakpoints[this.props.target].time)
    }
  }

  render () {
    return (
      <div>
        <Header></Header>
        <main>
          {this.props.loaded &&
            <ClockContainer />
          }
        </main>
        <Footer></Footer>
      </div>
    )
  }
}

const { bool, func } = PropTypes

App.propTypes = {
  loaded: bool,
  onAppLoad: func,
  startTimer: func
}

export default App
