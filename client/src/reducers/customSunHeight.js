import { setCustomSunHeightActions as actions } from '../actions/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case actions.SET_CUSTOM_SUN_HEIGHT:
    case actions.RESUME_AUTO_SUN_HEIGHT:
      return action.customSunHeight
    default:
      return state
  }
}
