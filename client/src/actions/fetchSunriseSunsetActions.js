import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../config'
import { toUTC } from '../Utils'

export const FETCH_SUNRISE_SUNSET_REQUEST = 'FETCH_SUNRISE_SUNSET_REQUEST'
export const FETCH_SUNRISE_SUNSET_FAILURE = 'FETCH_SUNRISE_SUNSET_FAILURE'
export const FETCH_SUNRISE_SUNSET_SUCCESS = 'FETCH_SUNRISE_SUNSET_SUCCESS'
export const UPDATE_SUNRISE_SUCCESS = 'UPDATE_SUNRISE_SUCCESS'

const fetchSunriseSunsetRequest = () => {
  return {
    type: FETCH_SUNRISE_SUNSET_REQUEST
  }
}

const fetchSunriseSunsetFailure = (err) => {
  console.log(err)

  return {
    type: FETCH_SUNRISE_SUNSET_FAILURE,
    err
  }
}

const fetchSunriseSunsetSuccess = (res) => {
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

const updateSunriseSuccess = (res) => {
  const sunrise = toUTC(new Date(res.sunrise))

  return {
    type: UPDATE_SUNRISE_SUCCESS,
    sunrise
  }
}

export const fetchSunriseSunsetData = (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchSunriseSunsetRequest())

    try {
      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=today`)
      const { results } = await res.json()

      dispatch(fetchSunriseSunsetSuccess(results))
    } catch (err) {
      dispatch(fetchSunriseSunsetFailure(err))
    }
  }
}

export const updateSunriseTime = (location, date) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchSunriseSunsetRequest())

    try {
      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=${date}`)
      const { results } = await res.json()

      dispatch(updateSunriseSuccess(results))
    } catch (err) {
      dispatch(fetchSunriseSunsetFailure(err))
    }
  }
}
