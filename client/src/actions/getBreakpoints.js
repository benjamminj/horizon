/* eslint-disable */
// import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../config'
import { toUTC } from '../Utils'

import {
  GET_BREAKPOINTS,
  GET_BREAKPOINTS_FAIL,
  GET_BREAKPOINTS_REQUEST,
  GET_BREAKPOINTS_SUCCESS
} from './actionTypes'

// Status methods will be routed to the status reducer
const getBreakpointsRequest = () => {
  return {
    type: GET_BREAKPOINTS_REQUEST
  }
}

const getBreakpointsFail = (err) => {
  return {
    type: GET_BREAKPOINTS_FAIL,
    err
  }
}

const getBreakpointsSuccess = () => {
  return {
    type: GET_BREAKPOINTS_SUCCESS
  }
}

const getBreakpoints = (res) => {
  const keys = Object.keys(res)
  const vals = Object.values(res)

  const breakpoints = keys.map((key, i) => {
    const levels = [
      { name: 'waiting_sunrise', cond: /_twilight_/ },
      { name: 'sunrise', cond: /^sunrise$/ },
      { name: 'waiting_sunset', cond: /^solar_noon$/ },
      { name: 'sunset', cond: /^sunset$/ }
    ]

    return {
      id: key,
      time: toUTC(new Date(vals[i])),
      status: levels.find(el => el.cond.test(key)).name
    }
  }).sort((cur, next) => cur.time - next.time)

  return {
    type: GET_BREAKPOINTS,
    breakpoints
  }
}

import {reqSunriseSunsetAPI} from './async/apiRequests'

export default (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(getBreakpointsRequest())

    try {
      const { results } = await reqSunriseSunsetAPI(lat, lng)

      delete results.day_length

      dispatch(getBreakpoints(results))
      dispatch(getBreakpointsSuccess())
    } catch (err) {
      dispatch(getBreakpointsFail(err))
    }
  }
}
