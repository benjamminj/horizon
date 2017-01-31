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
    const { location, fetchTimes, getIsDay, times, status } = this.props

    if (prev.location.isLoading && !location.isLoading) {
      fetchTimes(location)
    }

    if (!prev.times.loadSuccess && times.loadSuccess) {
      getIsDay(times)
      this.props.changeLightLevel(times, status)
    }
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
}

const { object, func } = PropTypes

App.propTypes = {
  changeLightLevel: func.isRequired,
  fetchLocation: func.isRequired,
  fetchTimes: func.isRequired,
  getIsDay: func.isRequired,
  location: object.isRequired,
  times: object.isRequired,
  status: object.isRequired
}

export default App
