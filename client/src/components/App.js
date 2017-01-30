import React, { Component, PropTypes } from 'react'

import './App.css'

import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.fetchLocation()

    console.log(this.props.location)
  }

  componentDidUpdate (prev) {
    const { location, fetchTimes } = this.props

    if (prev.location.isLoading && !location.isLoading) {
      fetchTimes(location)
    }
  }

  render () {
    const { loadSuccess } = this.props.times

    return (
      <div>
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
  fetchTimes: func.isRequired
}

export default App
