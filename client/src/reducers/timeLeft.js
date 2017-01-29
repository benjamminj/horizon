import {
  GET_TIME_LEFT,
  HANDLE_TIME_LEFT_AFTER_SUNSET,
  HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE
} from '../actions/timeLeftActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TIME_LEFT:
    case HANDLE_TIME_LEFT_AFTER_SUNSET:
      const { timeLeft } = action

      return {
        state,
        ...{
          timeLeft
        }
      }
    case HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE:
      const { err } = action

      return {
        state,
        ...err
      }
    default:
      return state
  }
}
