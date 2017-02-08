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

const { bool, func } = PropTypes

App.propTypes = {
  loaded: bool,
  onAppLoad: func
}

export default App
