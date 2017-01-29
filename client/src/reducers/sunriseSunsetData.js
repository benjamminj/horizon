import {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS
} from '../actions/fetchSunriseSunsetActions'

import {
  GET_TIME_LEFT,
  HANDLE_TIME_LEFT_AFTER_SUNSET,
  HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE
} from '../actions/timeLeftActions'

import { INC_NOW } from '../actions/updateNowActions'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUNRISE_SUNSET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SUNRISE_SUNSET_FAILURE:
      const { err } = action

      return {
        ...state,
        ...err,
        isLoading: false,
        loadSuccess: false
      }
    case FETCH_SUNRISE_SUNSET_SUCCESS:
      const { results } = action

      return {
        ...state,
        ...results,
        isLoading: false,
        loadSuccess: true
      }
    // Perhaps abstract into own reducer / piece ?
    case GET_TIME_LEFT:
    case HANDLE_TIME_LEFT_AFTER_SUNSET:
      const { timeLeft } = action

      return {
        ...state,
        timeLeft
      }
    case HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE:
      return {
        ...state,
        ...err
      }
    // Perhap abstract into own reducer?
    case INC_NOW:
      const { now } = action

      return {
        ...state,
        now
      }
    default:
      return state
  }
}
