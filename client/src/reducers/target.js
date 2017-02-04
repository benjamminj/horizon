import { GET_TARGET } from '../actions/constants/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TARGET:
      return action.target
    default:
      return state
  }
}
