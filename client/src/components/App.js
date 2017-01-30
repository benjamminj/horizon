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

const { object } = PropTypes

App.propTypes = {
  times: object.isRequired,
  location: object.isRequired
}

export default App
