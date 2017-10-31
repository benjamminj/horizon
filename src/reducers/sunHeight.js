import { SET_AUTO_SUN_HEIGHT } from '../actions/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case SET_AUTO_SUN_HEIGHT:
      return action.sunHeight
    default:
      return state
  }
}
