import { combineReducers } from 'redux'

import times from './times'
import location from './location'

export default combineReducers({
  location,
  times
})
