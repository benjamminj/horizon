import { GET_REMAINING } from '../actions/actionTypes'

export default (remaining = null, action) => {
  switch (action.type) {
    case GET_REMAINING:
      return action.remaining
    default:
      return remaining
  }
}
