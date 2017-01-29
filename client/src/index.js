import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'
import './index.css'

import { fetchSunriseSunsetData } from './actions/fetchSunriseSunsetActions'
import { fetchLocation } from './actions/fetchLocationActions'
import { getTimeLeft } from './actions/timeLeftActions'

store.dispatch(fetchSunriseSunsetData({ lat: 33.1234, lng: -117.1234 }))
store.dispatch(fetchLocation())

let testObj = {
  sunrise: 1483166706000,
  sunset: 1483204706000,
  now: 1483739658000,
  isDay: false,
  lat: 33.9414,
  lng: -117.9555
}

store.dispatch(getTimeLeft(testObj))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
