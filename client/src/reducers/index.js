/* eslint-disable */
import { combineReducers } from 'redux'

import location from './location'
import breakpoints from './breakpoints'
import currentIndex from './currentIndex'
import remaining from './remaining'

export default combineReducers({
  location,
  breakpoints,
  currentIndex,
  remaining
})
