import { GET_BREAKPOINTS } from '../actions/constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case GET_BREAKPOINTS:
      return action.breakpoints
    default:
      return state
  }
}
