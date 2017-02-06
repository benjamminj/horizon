/* eslint-disable */
import getLocation from '../getLocation'
import getBreakpoints from '../getBreakpoints'
import getCurrentIndex from '../getCurrentIndex'
import getRemaining from '../getRemaining'
import getTarget from '../getTarget'

import { updateSunriseTimes } from '../updateBreakpoints'

function appLoaded () {
  return {
    type: 'APP_LOAD_SUCCESS',
    loaded: true
  }
}

export default () => {
  return async (dispatch) => {
    try {
      const { location } = await dispatch(getLocation())

      let { breakpoints } = await dispatch(getBreakpoints(location))

      const { currentIndex } = dispatch(getCurrentIndex(breakpoints))

      if (currentIndex >= 6) {
        let updated = await dispatch(updateSunriseTimes(breakpoints, location))
        breakpoints = updated.breakpoints
      }

      const { target } = dispatch(getTarget(breakpoints[currentIndex].status))
      dispatch(getRemaining(breakpoints[target].time))

      return dispatch(appLoaded())
    } catch (err) {
      return err
    }
  }
}
