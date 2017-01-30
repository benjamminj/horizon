import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS
} from '../actions/locationActions'

export default (state = {}, action) => {
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
