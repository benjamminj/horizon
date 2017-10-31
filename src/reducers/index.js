import { combineReducers } from 'redux'

import location from './location'
import breakpoints from './breakpoints'
import currentIndex from './currentIndex'
import remaining from './remaining'
import target from './target'
import loaded from './loaded'
import customSunHeight from './customSunHeight'
import sunHeight from './sunHeight'

export default combineReducers({
  location,
  breakpoints,
  currentIndex,
  remaining,
  target,
  loaded,
  customSunHeight,
  sunHeight
})
