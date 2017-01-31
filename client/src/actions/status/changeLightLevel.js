import { CHANGE_LIGHT_LEVEL } from './actionTypes'

export default (times, status) => {
  return {
    type: CHANGE_LIGHT_LEVEL,
    lightLevel: 'NIGHT'
  }
}
