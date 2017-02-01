import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../../config'
import { toUTC } from '../../Utils'

import {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS
} from './actionTypes'

const fetchTimesRequest = () => {
  return {
    type: FETCH_SUNRISE_SUNSET_REQUEST
  }
}

const fetchTimesFailure = (err) => {
  return {
    type: FETCH_SUNRISE_SUNSET_FAILURE,
    err
  }
}

const fetchTimesSuccess = (res) => {
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
    type: FETCH_SUNRISE_SUNSET_SUCCESS,
    results: res,
    breakpoints
  }
}

export default (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchTimesRequest())

    try {
      const today = new Date(Date.now())

      let year = today.getFullYear()
      let date = today.getDate()
      let month = today.getMonth() + 1

      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=${year}-${month}-${date}`)
      const { results } = await res.json()

      delete results.day_length
      dispatch(fetchTimesSuccess(results))
    } catch (err) {
      dispatch(fetchTimesFailure(err))
    }
  }
}
