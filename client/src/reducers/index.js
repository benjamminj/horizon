import { combineReducers } from 'redux'

import sunriseSunsetData from './sunriseSunsetData'
import location from './location'
import timeLeft from './timeLeft'

export default combineReducers({
  location,
  sunriseSunsetData,
  timeLeft
})
