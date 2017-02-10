import { GET_REMAINING } from './actionTypes'

export default (targetTime, now) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - now
  }
}
