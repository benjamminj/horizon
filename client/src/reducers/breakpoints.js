import { GET_BREAKPOINTS } from '../actions/getBreakpoints.js'

export default (state = [], action) => {
  switch (action.type) {
    case GET_BREAKPOINTS:
      return {
        ...state,
        ...action.breakpoints
      }
    default:
      return state
  }
}
