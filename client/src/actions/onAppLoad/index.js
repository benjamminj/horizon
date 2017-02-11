import { updateSunriseTimes } from '../breakpoints'
import { getCurrentIndex } from '../currentIndex'
import getTarget from '../getTarget'
import runTimer from './runTimer'

import fetchRemoteData from './fetchRemoteData'

import * as actions from './appLoadActions'

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
      dispatch(actions.appLoaded())
    } catch (err) {
      console.log('here', err)
      dispatch(actions.appLoadFail())
    }
  }
}
