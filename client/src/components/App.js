/* eslint-disable */
import React, { Component, PropTypes } from 'react'

import './App.css'

import Header from './Header'
import ClockContainer from '../containers/ClockContainer'
import Footer from './Footer'

import AppStyles from './AppStyles'

// import Clock from '../components/Clock'

export default () => {
  const styleObject = {
    background: 'red'
  }

  return (
    <div style={styleObject}>
      <ClockContainer />
    </div>
  )
}
