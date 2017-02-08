import { GET_REMAINING } from './constants/actionTypes'

export default (targetTime, now) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - now
  }
}
