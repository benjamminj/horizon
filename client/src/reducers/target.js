import { GET_TARGET } from '../actions/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TARGET:
      return action.target
    default:
      return state
  }
}
