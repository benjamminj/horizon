import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import './index.css'

import store from './store'
import { fetchSunriseSunsetData } from './actions/fetchSunriseSunsetActions'
import { fetchLocation } from './actions/fetchLocationActions'

store.dispatch(fetchSunriseSunsetData({ lat: 33.1234, lng: -117.1234 }))
store.dispatch(fetchLocation())

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
