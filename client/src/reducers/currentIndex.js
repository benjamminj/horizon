import { GET_CURRENT_INDEX } from '../actions/getCurrentIndex'

export default (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_INDEX:
      return action.currentIndex
    default:
      return state
  }
}
