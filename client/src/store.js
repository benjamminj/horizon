import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default store
