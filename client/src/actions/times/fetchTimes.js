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
  console.log(err)

  return {
    type: FETCH_SUNRISE_SUNSET_FAILURE,
    err
  }
}

const fetchTimesSuccess = (res) => {
  const results = {
    civilTwilightBegin: toUTC(new Date(res.civil_twilight_begin)),
    civilTwilightEnd: toUTC(new Date(res.civil_twilight_end)),
    sunrise: toUTC(new Date(res.sunrise)),
    sunset: toUTC(new Date(res.sunset)),
    now: Date.now(),
    dayLength: res.day_length * 1000
  }

  const { civilTwilightBegin, civilTwilightEnd, now } = results
  const isDay = (civilTwilightBegin - now) < 0 && (civilTwilightEnd - now) > 0

  return {
    type: FETCH_SUNRISE_SUNSET_SUCCESS,
    results,
    isDay
  }
}

export default (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchTimesRequest())

    try {
      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=today`)
      const { results } = await res.json()

      dispatch(fetchTimesSuccess(results))
    } catch (err) {
      dispatch(fetchTimesFailure(err))
    }
  }
}
