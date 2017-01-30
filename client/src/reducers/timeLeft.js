import {
  GET_TIME_LEFT,
  GET_TIME_LEFT_FAILURE,
  UPDATE_TIME_LEFT_AFTER_SUNSET
} from '../actions/timeLeftActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TIME_LEFT:
    case UPDATE_TIME_LEFT_AFTER_SUNSET:
      const { timeLeft } = action

      return {
        state,
        ...{
          timeLeft
        }
      }
    case GET_TIME_LEFT_FAILURE:
      const { err } = action

      return {
        state,
        ...err
      }
    default:
      return state
  }
}
