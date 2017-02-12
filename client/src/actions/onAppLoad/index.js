import { getCurrentIndex } from '../currentIndex'
import getTarget from '../getTarget'
import runTimer from '../runTimer'

import fetchRemoteData from './fetchRemoteData'
import refreshSunriseTimes from './refreshSunriseTimes'

import * as actions from './appLoadActions'

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
      dispatch(actions.appLoadFail())
    }
  }
}
