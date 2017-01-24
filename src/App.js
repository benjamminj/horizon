import React, { Component } from 'react'
import './App.css'

import Header from './Header'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <main>Main</main>
        <footer>Footer</footer>
      </div>
    )
  }
}

export default App
