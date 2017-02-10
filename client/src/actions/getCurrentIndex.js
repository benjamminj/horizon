import { GET_CURRENT_INDEX } from './constants/actionTypes'

export default (breakpoints, now) => {
  const lastIndex = breakpoints.length - 1

  const currentIndex = breakpoints.findIndex(({ time }, i, arr) => {
    const next = i < lastIndex ? arr[i + 1] : arr[lastIndex]

    return (time <= now) && (now < next.time)
  })

  return {
    type: GET_CURRENT_INDEX,
    currentIndex: currentIndex >= 0 ? currentIndex : lastIndex
  }
}
