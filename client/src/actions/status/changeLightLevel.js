import { CHANGE_LIGHT_LEVEL } from './actionTypes'

export default (lightLevel) => {
  return {
    type: CHANGE_LIGHT_LEVEL,
    lightLevel
  }
}
