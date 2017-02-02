/* eslint-disable */
import { combineReducers } from 'redux'

import location from './location'
import breakpoints from './breakpoints'
import currentIndex from './currentIndex'
import remaining from './remaining'
import target from './target'

export default combineReducers({
  location,
  breakpoints,
  currentIndex,
  remaining,
  target
})
