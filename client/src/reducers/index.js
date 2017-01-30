import { combineReducers } from 'redux'

import times from './times'
import location from './location'
import status from './status'

export default combineReducers({
  location,
  status,
  times
})
