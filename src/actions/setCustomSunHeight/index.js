import { setCustomSunHeightActions as actions } from '../actionTypes'

export function setCustomSunHeight (height) {
  return {
    type: actions.SET_CUSTOM_SUN_HEIGHT,
    customSunHeight: height
  }
}

export function resumeAutoSunHeight () {
  return {
    type: actions.RESUME_AUTO_SUN_HEIGHT,
    customSunHeight: null
  }
}
