import React, { Component, PropTypes } from 'react'

import './App.css'

import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

class App extends Component {
  componentDidMount () {
    this.props.fetchLocation()

    setTimeout(() => {
      this.props.changeLightLevel('SUNRISE')
    }, 5000)
  }

  componentDidUpdate (prev) {
    const { location, fetchTimes, getIsDay, times } = this.props

    if (prev.location.isLoading && !location.isLoading) {
      fetchTimes(location)
    }

    if (!prev.times.loadSuccess && times.loadSuccess) {
      getIsDay(times)
    }
  }

  render () {
    const { times, status } = this.props

    const { loadSuccess } = times

    const styles = AppStyles(status.lightLevel)

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

  // checkForLightChange () {
  //   console.log('Not slowing down yet?')

  //   const { status, times } = this.props // eslint-disable-line
  //   const { now, sunrise, sunset, civilTwilightEnd, civilTwilightBegin } = times // eslint-disable-line
  //   const { isDay, lightLevel } = status // eslint-disable-line

  //   // Will need to check the various options and then return / dispatch various actions based ont he results
  //   let currentLevel

  //   if (isDay && sunset - now < 0) {
  //     currentLevel = 'SUNSET'
  //   } else if (isDay && sunrise - now > 0) {
  //     currentLevel = 'SUNRISE'
  //   } else if (isDay && civilTwilightEnd - now > 0 && sunset - now < 0) {
  //     currentLevel = 'PM_TWILIGHT'
  //   } else if (isDay && civilTwilightBegin - now > 0) {
  //     currentLevel = 'AM_TWILIGHT'
  //   } else if (!isDay) {
  //     currentLevel = 'NIGHT'
  //   } else {
  //     currentLevel = 'DAY'
  //   }

  //   return currentLevel === lightLevel ? null
  // }
}

const { object, func } = PropTypes

App.propTypes = {
  fetchLocation: func.isRequired,
  fetchTimes: func.isRequired,
  getIsDay: func.isRequired,
  location: object.isRequired,
  times: object.isRequired,
  status: object.isRequired,
  changeLightLevel: func.isRequired
}

export default App
