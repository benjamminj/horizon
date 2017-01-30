import React, { Component, PropTypes } from 'react'

import './App.css'

import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

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
  }

  render () {
    const { loadSuccess } = this.props.times

    const styles = AppStyles(this.props.times)

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
  times: object.isRequired,
  location: object.isRequired,
  fetchLocation: func.isRequired,
  fetchTimes: func.isRequired,
  getIsDay: func.isRequired
}

export default App
