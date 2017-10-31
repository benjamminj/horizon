import { SET_AUTO_SUN_HEIGHT } from '../actionTypes'
import isFinalIndex from '../utils/isFinalIndex'

export default (breakpoints, currentIndex) => {
  return {
    type: SET_AUTO_SUN_HEIGHT,
    sunHeight: calcPercent(breakpoints, currentIndex)
  }
}

function calcPercent (breakpoints, currentIndex) {
  const current = breakpoints[currentIndex]
  const next = !isFinalIndex(currentIndex, breakpoints) ? breakpoints[currentIndex + 1] : breakpoints[0]

  const timeBetween = next.time - current.time
  const timeLeft = next.time - Date.now()
  const percentLeft = timeLeft / timeBetween

  const distance = Math.abs(next.lightLevel - current.lightLevel)
  const distanceLeft = distance * percentLeft

  const ascending = next.lightLevel > current.lightLevel
  const percent = ascending ? (next.lightLevel - distanceLeft) : (next.lightLevel + distanceLeft)

  return percent
}
