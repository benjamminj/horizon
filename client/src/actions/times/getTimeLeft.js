import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../../config'
import { toUTC } from '../../Utils'

import {
  GET_TIME_LEFT,
  GET_TIME_LEFT_FAILURE,
  UPDATE_TIME_LEFT_AFTER_SUNSET
} from './actionTypes'

const getTimeLeftDefault = (payload) => {
  const { isDay, sunset, sunrise, now } = payload

  return {
    type: GET_TIME_LEFT,
    timeLeft: isDay ? sunset - now : sunrise - now
  }
}

const updateTimeLeftAfterSunset = (payload) => {
  const { newSunrise, now } = payload

  return {
    type: UPDATE_TIME_LEFT_AFTER_SUNSET,
    timeLeft: newSunrise - now
  }
}

const getTimeLeftError = (err) => {
  return {
    type: GET_TIME_LEFT_FAILURE,
    err
  }
}

export default (payload) => {
  const { isDay, sunrise, sunset, lat, lng, now } = payload

  const isAfterSunsetToday = sunrise - now < 0 && sunset - now < 0

  return async (dispatch) => {
    try {
      if (isAfterSunsetToday) {
        const res = await fetch(`${API_SERVER}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=tomorrow`)
        const { results } = await res.json()
        const newSunrise = toUTC(new Date(results.sunrise))

        dispatch(updateTimeLeftAfterSunset({ newSunrise, now }))
      } else {
        dispatch(getTimeLeftDefault({ isDay, sunset, sunrise, now }))
      }
    } catch (err) {
      dispatch(getTimeLeftError(err))
    }
  }
}
