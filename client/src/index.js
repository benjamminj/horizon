import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import AppContainer from './containers/AppContainer'
import './index.css'

import { fetchSunriseSunsetData } from './actions/fetchSunriseSunsetActions'
import { fetchLocation } from './actions/fetchLocationActions'
// import { getTimeLeft } from './actions/timeLeftActions'

store.dispatch(fetchSunriseSunsetData({ lat: 33.1234, lng: -117.1234 }))
store.dispatch(fetchLocation())

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
