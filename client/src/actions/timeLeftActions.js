import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../config'
import { toUTC } from '../Utils'
// import { updateSunriseTime } from './fetchSunriseSunsetActions'

export const GET_TIME_LEFT = 'GET_TIME_LEFT'
export const HANDLE_TIME_LEFT_AFTER_SUNSET = 'HANDLE_TIME_LEFT_AFTER_SUNSET'
export const HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE = 'HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE'

const getTimeLeftDefault = (payload) => {
  const { isDay, sunset, sunrise, now } = payload

  return {
    type: GET_TIME_LEFT,
    timeLeft: isDay ? sunset - now : sunrise - now
  }
}

const getTimeLeftAfterSunset = (payload) => {
  const { newSunrise, now } = payload

  return {
    type: HANDLE_TIME_LEFT_AFTER_SUNSET,
    timeLeft: newSunrise - now
  }
}

const getTimeLeftError = (err) => {
  return {
    type: HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE,
    err
  }
}

export const getTimeLeft = (payload) => {
  const { isDay, sunrise, sunset, lat, lng, now } = payload

  const isAfterSunsetToday = sunrise - now < 0 && sunset - now < 0

  return async (dispatch) => {
    try {
      if (isAfterSunsetToday) {
        const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=tomorrow`)
        const { results } = await res.json()

        const newSunrise = toUTC(new Date(results.sunrise))

        console.log(newSunrise)
        console.log(now)

        console.log(newSunrise - now)

        dispatch(getTimeLeftAfterSunset({ newSunrise, now }))
      } else {
        dispatch(getTimeLeftDefault({ isDay, sunset, sunrise, now }))
      }
    } catch (err) {
      dispatch(getTimeLeftError(err))
    }
  }
}
