import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'
import './index.css'

import { fetchSunriseSunsetData } from './actions/fetchSunriseSunsetActions'
import { fetchLocation } from './actions/fetchLocationActions'

store.dispatch(fetchSunriseSunsetData({ lat: 33.1234, lng: -117.1234 }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
