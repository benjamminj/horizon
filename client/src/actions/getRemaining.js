import { GET_REMAINING } from './constants/actionTypes'

export default (targetTime) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - Date.now()
  }
}
