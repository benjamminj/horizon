import React, { Component, PropTypes } from 'react'

import './App.css'

import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

class App extends Component {
  componentDidMount () {
    this.props.fetchLocation()
  }

  componentDidUpdate (prev) {
    const { location, fetchTimes, getIsDay, times } = this.props

    if (prev.location.isLoading && !location.isLoading) {
      fetchTimes(location)
    }

    if (!prev.times.loadSuccess && times.loadSuccess) {
      getIsDay(times)
    }

    this.checkForLightChange()
  }

  render () {
    const { times, status } = this.props

    const { loadSuccess } = times

    const styles = AppStyles(status, times)

    return (
      <div style={styles}>
        <Header />
        <main>
          {loadSuccess &&
            <ClockContainer />
          }
        </main>
        <Footer />
      </div>
    )
  }

  checkForLightChange () {
    console.log('Not slowing down yet?')

    const { status, times } = this.props // eslint-disable-line
    const { now, sunrise, sunset, civilTwilightEnd, civilTwilightBegin } = times // eslint-disable-line
    const { isDay } = status // eslint-disable-line

    // Will need to check the various options and then return / dispatch various actions based ont he results
    let lightLevel

    if (isDay && sunset - now < 0) {
      lightLevel = 'SUNSET'
    } else if (isDay && sunrise - now > 0) {
      lightLevel = 'SUNRISE'
    } else if (isDay && civilTwilightEnd - now > 0 && sunset - now < 0) {
      lightLevel = 'PM_TWILIGHT'
    } else if (isDay && civilTwilightBegin - now > 0) {
      lightLevel = 'AM_TWILIGHT'
    } else if (!isDay) {
      lightLevel = 'NIGHT'
    } else {
      lightLevel = 'DAY'
    }

    console.log(lightLevel)
  }
}

const { object, func } = PropTypes

App.propTypes = {
  fetchLocation: func.isRequired,
  fetchTimes: func.isRequired,
  getIsDay: func.isRequired,
  location: object.isRequired,
  times: object.isRequired,
  status: object.isRequired
}

export default App
