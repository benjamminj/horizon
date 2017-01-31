import { actionTypes } from '../actions/location'

const {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS
} = actionTypes

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_LOCATION_FAILURE:
      const { err } = action

      return {
        ...state,
        isLoading: false,
        loadSuccess: false,
        err
      }
    case FETCH_LOCATION_SUCCESS:
      const { res } = action

      return {
        ...state,
        ...res,
        isLoading: false,
        loadSuccess: true
      }
    default:
      return state
  }
}
