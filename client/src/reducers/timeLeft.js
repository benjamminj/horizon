import { GET_TIME_LEFT } from '../actions/timeLeftActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TIME_LEFT:
      return
    default:
      return state
  }
}
