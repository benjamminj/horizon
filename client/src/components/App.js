import React, { Component, PropTypes } from 'react'

import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'
import Header from './Header'
import SunContainer from '../containers/SunContainer'

import './App.css'

class App extends Component {
  async componentDidMount () {
    this.props.onAppLoad()
  }

  render () {
    const { loaded } = this.props

    if (loaded) {
      return (
        <div id='app'>
          <Header />
          <main>
            <ClockContainer />
          </main>
          <Footer />
          <SunContainer />
        </div>
      )
    } else {
      return (<div id="app" />)
    }
  }
}

const { bool, func } = PropTypes

App.propTypes = {
  loaded: bool,
  onAppLoad: func
}

export default App
