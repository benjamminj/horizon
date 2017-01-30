import { actionTypes } from '../actions/status'

const {
  GET_IS_DAY
} = actionTypes

export default (state = {}, action) => {
  switch (action.type) {
    case GET_IS_DAY:
      const { isDay } = action

      return {
        ...state,
        isDay
      }
    default:
      return state
  }
}
