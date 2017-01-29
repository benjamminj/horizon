import { combineReducers } from 'redux'

import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS
} from '../actions/fetchLocationActions'

import {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS
} from '../actions/fetchSunriseSunsetActions'

export const location = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        state, ...{ isLoading: true }
      }
    case FETCH_LOCATION_FAILURE:
      const { err } = action

      return {
        state,
        ...{
          isLoading: false,
          loadSuccess: false,
          err
        }
      }
    case FETCH_LOCATION_SUCCESS:
      const { res } = action

      return {
        state,
        ...{
          isLoading: false,
          loadSuccess: true,
          ...res
        }
      }
    default:
      return state
  }
}

export const sunriseSunsetData = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUNRISE_SUNSET_REQUEST:
      return {
        state, ...{ isLoading: true }
      }
    case FETCH_SUNRISE_SUNSET_FAILURE:
      const { err } = action

      return {
        state,
        ...{
          isLoading: false,
          loadSuccess: false,
          err
        }
      }
    case FETCH_SUNRISE_SUNSET_SUCCESS:
      const { results } = action

      return {
        state,
        ...{
          isLoading: false,
          loadSuccess: true,
          ...results
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  location,
  sunriseSunsetData
})
