import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../config'
import { toUTC } from '../Utils'

export const FETCH_SUNRISE_SUNSET_REQUEST = 'FETCH_SUNRISE_SUNSET_REQUEST'
export const FETCH_SUNRISE_SUNSET_FAILURE = 'FETCH_SUNRISE_SUNSET_FAILURE'
export const FETCH_SUNRISE_SUNSET_SUCCESS = 'FETCH_SUNRISE_SUNSET_SUCCESS'
export const UPDATE_SUNRISE_TIME = 'UPDATE_SUNRISE_TIME'

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
    now: toUTC(new Date(Date.now())),
    dayLength: res.day_length * 1000
  }

  return {
    type: FETCH_SUNRISE_SUNSET_SUCCESS,
    results
  }
}

const updateSunriseTime = (res) => {
  const sunrise = toUTC(new Date(res.sunrise)

  return {
    type: UPDATE_SUNRISE_TIME,
    sunrise
  }
}

export const fetchSunriseSunsetData = (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchSunriseSunsetRequest())

    try {
      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}`)
      const { results } = await res.json()

      dispatch(fetchSunriseSunsetSuccess(results))
    } catch (err) {
      dispatch(fetchSunriseSunsetFailure(err))
    }
  }
}

export const updateSunriseTime = (location) => {
  return async (dispatch) => {
    const { lat, lng } = location

    dispatch(fetchSunriseSunsetRequest())

    try {
      const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=tomorrow`)
      const { results } = await res.json()

      dispatch(updateSunriseSuccess(results))
    } catch (err) {
      dispatch(fetchSunriseSunsetFailure(err))
    }
  }
}
