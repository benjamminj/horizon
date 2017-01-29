import {
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS
} from '../actions/fetchSunriseSunsetActions'

export default (state = {}, action) => {
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
