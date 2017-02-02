export const GET_REMAINING = 'GET_REMAINING'

export default (targetTime) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - Date.now()
  }
}
