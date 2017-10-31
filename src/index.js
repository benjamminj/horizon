import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import './index.css'

import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
