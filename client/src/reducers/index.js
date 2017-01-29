import { combineReducers } from 'redux'

import { ADD_LOCATION } from '../actions/actionTypes'
import {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS } from '../actions/fetchSunriseSunsetActions'

export const addLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      console.log('ADding location')
      const { location } = action
      return { state, ...location }
    default:
      return state
  }
}

export const fetchSunriseSunsetReducer = (state = {}, action) => {
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
          data: results
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  addLocationReducer
})
