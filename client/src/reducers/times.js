import { actionTypes } from '../actions/times'

const {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS,
  GET_TIME_LEFT,
  UPDATE_TIME_LEFT_AFTER_SUNSET,
  HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE,
  INC_NOW
} = actionTypes

const initialState = {
  isLoading: false,
  loadSuccess: false
}

export default (state = initialState, action) => {
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
      const { results, isDay } = action

      return {
        ...state,
        ...results,
        isDay,
        isLoading: false,
        loadSuccess: true
      }
    // Perhaps abstract into own reducer / piece ?
    case GET_TIME_LEFT:
      const { timeLeft } = action

      return {
        ...state,
        timeLeft
      }
    case UPDATE_TIME_LEFT_AFTER_SUNSET:
      const { newSunrise } = action

      return {
        ...state,
        timeLeft: action.timeLeft,
        sunrise: newSunrise
      }
    case HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE:
      return {
        ...state,
        ...err
      }
    // Perhap abstract into own reducer?
    case INC_NOW:
      // const { now } = action

      return {
        ...state,
        now: action.now,
        timeLeft: action.timeLeft
      }
    default:
      return state
  }
}
