import { GET_BREAKPOINTS, UPDATE_AM_BREAKPOINTS } from '../actions/constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case GET_BREAKPOINTS:
    case UPDATE_AM_BREAKPOINTS:
      return action.breakpoints
    default:
      return state
  }
}
