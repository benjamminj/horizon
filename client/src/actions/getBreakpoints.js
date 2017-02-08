import { reqSunriseSunsetAPI } from './async/apiRequests'
import { formatBreakpoints } from './utils'

import {
  GET_BREAKPOINTS,
  GET_BREAKPOINTS_FAIL,
  GET_BREAKPOINTS_REQUEST,
  GET_BREAKPOINTS_SUCCESS
} from './constants/actionTypes'

// Status methods will be routed to the status reducer
function getBreakpointsRequest () {
  return {
    type: GET_BREAKPOINTS_REQUEST,
    loading: true
  }
}

function getBreakpointsFail (err) {
  return {
    type: GET_BREAKPOINTS_FAIL,
    loading: false,
    err
  }
}

function getBreakpointsSuccess () {
  return {
    type: GET_BREAKPOINTS_SUCCESS,
    loading: false,
    success: true
  }
}

function getBreakpoints (breakpoints) {
  return {
    type: GET_BREAKPOINTS,
    breakpoints
  }
}

export default (location) => {
  return async (dispatch) => {
    dispatch(getBreakpointsRequest())

    try {
      const today = new Date(Date.now())
      const { results } = await reqSunriseSunsetAPI(location, today)
      const breakpoints = formatBreakpoints(results)

      dispatch(getBreakpointsSuccess())
      return dispatch(getBreakpoints(breakpoints))
    } catch (err) {
      dispatch(getBreakpointsFail(err))
    }
  }
}
