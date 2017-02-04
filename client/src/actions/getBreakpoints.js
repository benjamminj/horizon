import {reqSunriseSunsetAPI} from './async/apiRequests'
import { toUTC } from '../Utils'

import {
  GET_BREAKPOINTS,
  GET_BREAKPOINTS_FAIL,
  GET_BREAKPOINTS_REQUEST,
  GET_BREAKPOINTS_SUCCESS
} from './constants/actionTypes'

// Status methods will be routed to the status reducer
function getBreakpointsRequest () {
  return {
    type: GET_BREAKPOINTS_REQUEST
  }
}

function getBreakpointsFail (err) {
  return {
    type: GET_BREAKPOINTS_FAIL,
    err
  }
}

function getBreakpointsSuccess () {
  return {
    type: GET_BREAKPOINTS_SUCCESS
  }
}

function getBreakpoints (res) {
  const keys = Object.keys(res)
  const vals = Object.values(res)

  console.log(keys, vals)

  const levels = [
    { name: 'waiting_sunrise', cond: /_twilight_|sunset_end/ },
    { name: 'sunrise', cond: /^sunrise$/ },
    { name: 'waiting_sunset', cond: /^solar_noon$|sunrise_end/ },
    { name: 'sunset', cond: /^sunset$/ }
  ]

  const breakpoints = keys.map((key, i) => {
    return {
      id: key,
      time: toUTC(new Date(vals[i])),
      status: levels.find((el) => el.cond.test(key)).name
    }
  }).sort((cur, next) => cur.time - next.time)

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
