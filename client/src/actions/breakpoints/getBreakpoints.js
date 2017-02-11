import { reqSunriseSunsetAPI } from '../apiRequests'
import { formatBreakpoints } from '../utils'

import { GET_BREAKPOINTS } from '../actionTypes'

function getBreakpoints (breakpoints) {
  return {
    type: GET_BREAKPOINTS,
    breakpoints
  }
}

export default (location) => {
  return async (dispatch) => {
    try {
      const today = new Date(Date.now())
      const { results } = await reqSunriseSunsetAPI(location, today)
      const breakpoints = formatBreakpoints(results)

      return dispatch(getBreakpoints(breakpoints))
    } catch (err) {
      throw new Error(err)
    }
  }
}
