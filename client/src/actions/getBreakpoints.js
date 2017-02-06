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

function getBreakpoints (res) {
  return {
    type: GET_BREAKPOINTS,
    breakpoints: formatBreakpoints(res)
  }
}

export default (location) => {
  return async (dispatch) => {
    dispatch(getBreakpointsRequest())

    try {
      const today = new Date(Date.now())
      const { results } = await reqSunriseSunsetAPI(location, today)

      delete results.day_length

      addEndTime(results, 'sunrise')
      addEndTime(results, 'sunset')

      dispatch(getBreakpointsSuccess())
      return dispatch(getBreakpoints(results))
    } catch (err) {
      dispatch(getBreakpointsFail(err))
    }
  }
}

function addEndTime (obj, key) {
  const date = new Date(obj[key])

  obj[`${key}_end`] = date.setMinutes(date.getMinutes() + 5)
}
