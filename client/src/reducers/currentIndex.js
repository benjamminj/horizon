import { GET_CURRENT_INDEX, INC_CURRENT_INDEX } from '../actions/constants/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_INDEX:
      return action.currentIndex
    case INC_CURRENT_INDEX:
      return action.currentIndex
    default:
      return state
  }
}
