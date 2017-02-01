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
  // console.log(res)

  const results = {
    civilTwilightBegin: toUTC(new Date(res.civil_twilight_begin)),
    civilTwilightEnd: toUTC(new Date(res.civil_twilight_end)),
    sunrise: toUTC(new Date(res.sunrise)),
    sunset: toUTC(new Date(res.sunset)),
    now: Date.now(),
    dayLength: res.day_length * 1000
  }

  return {
    type: FETCH_SUNRISE_SUNSET_SUCCESS,
    results
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

      dispatch(fetchTimesSuccess(results))
    } catch (err) {
      dispatch(fetchTimesFailure(err))
    }
  }
}
