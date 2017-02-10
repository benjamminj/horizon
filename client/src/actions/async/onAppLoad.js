import { getLocation } from '../location'
import { getBreakpoints, updateSunriseTimes } from '../breakpoints'
import { getCurrentIndex } from '../currentIndex'
import getTarget from '../getTarget'
import runTimer from './runTimer'


import { APP_LOAD_SUCCESS, APP_LOAD_FAIL } from '../actionTypes'

const appLoaded = () => {
  return {
    type: APP_LOAD_SUCCESS,
    loaded: true
  }
}

const appLoadFail = () => {
  return {
    type: APP_LOAD_FAIL,
    loaded: false
  }
}

const fetchRemoteData = () => {
  return async (dispatch) => {
    try {
      const { location } = await dispatch(getLocation())
      const { breakpoints } = await dispatch(getBreakpoints(location))

      return { breakpoints, location }
    } catch (err) {
      throw new Error(err)
    }
  }
}

const refreshSunriseTimes = (oldBreakpoints, location) => {
  return async (dispatch) => {
    try {
      const { breakpoints } = await dispatch(updateSunriseTimes(oldBreakpoints, location))

      return breakpoints
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default () => {
  return async (dispatch) => {
    try {
      let { breakpoints, location } = await dispatch(fetchRemoteData())
      const { currentIndex } = dispatch(getCurrentIndex(breakpoints, Date.now()))

      // TODO -- need to handle times after midnight so that doesn't refresh @ 1am
      if (currentIndex >= 6) {
        breakpoints = await dispatch(refreshSunriseTimes(breakpoints, location))
      }

      const { target } = dispatch(getTarget(breakpoints[currentIndex].status))

      dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      dispatch(appLoaded())
    } catch (err) {
      console.log(err)
      dispatch(appLoadFail())
    }
  }
}
