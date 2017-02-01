export const GET_CURRENT_INDEX = 'GET_CURRENT_INDEX'

export default (breakpoints) => {
  const now = Date.now()

  const index = breakpoints.findIndex(({ time }, i) => {
    return (time <= now) && (now < breakpoints[i + 1].time)
  })

  return {
    type: GET_CURRENT_INDEX,
    index
  }
}
