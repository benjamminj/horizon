import { APP_LOAD_SUCCESS, APP_LOAD_FAIL } from '../actions/constants/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case APP_LOAD_SUCCESS:
      return action.loaded
    case APP_LOAD_FAIL:
      return action.loaded
    default:
      return state
  }
}
