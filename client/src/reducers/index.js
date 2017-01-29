import { combineReducers } from 'redux'

import sunriseSunsetData from './sunriseSunsetData'
import location from './location'

export default combineReducers({
  location,
  sunriseSunsetData
})
