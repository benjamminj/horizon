import { GET_CURRENT_INDEX } from './constants/actionTypes'

export default (breakpoints, now) => {
  const currentIndex = breakpoints.findIndex(({ time }, i, arr) => {
    const { length } = arr
    const next = i < length - 1 ? arr[i + 1] : arr[length - 1]

    return (time <= now) && (now < next.time)
  })

  return {
    type: GET_CURRENT_INDEX,
    currentIndex: currentIndex > 0 ? currentIndex : (breakpoints.length - 1)
  }
}
