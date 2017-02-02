import { GET_REMAINING } from './actionTypes'

export default (targetTime) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - Date.now()
  }
}
