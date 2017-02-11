import { reqSunriseSunsetAPI } from '../apiRequests'
import { formatBreakpoints } from '../utils'

import { UPDATE_AM_BREAKPOINTS } from '../actionTypes'

export default (breakpoints, location) => {
  return async (dispatch) => {
    try {
      const tomorrow = new Date((Date.now() + (1000 * 60 * 60 * 24)))

      const { results } = await reqSunriseSunsetAPI(location, tomorrow)
      const mergeData = formatBreakpoints(results).slice(0, 4)
      const oldData = breakpoints.slice(4)

      return dispatch(updateAMBreakpoints(mergeData.concat(oldData)))
    } catch (err) {
      console.log(err)
    }
  }
}

function updateAMBreakpoints (newBreakpoints) {
  return {
    type: UPDATE_AM_BREAKPOINTS,
    breakpoints: newBreakpoints
  }
}
