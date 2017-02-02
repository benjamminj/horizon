import { GET_CURRENT_INDEX } from './actionTypes'

export default (breakpoints) => {
  const now = Date.now()

  const currentIndex = breakpoints.findIndex(({ time }, i) => {
    return (time <= now) && (now < breakpoints[i + 1].time)
  })

  return {
    type: GET_CURRENT_INDEX,
    currentIndex
  }
}
