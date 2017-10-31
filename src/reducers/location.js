import { GET_LOCATION } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        ...action.location
      }
    default:
      return state
  }
}
