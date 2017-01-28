import { createStore } from 'redux'
import { sunriseSunsetApp } from './reducers'

let store = createStore(sunriseSunsetApp)

export default store
