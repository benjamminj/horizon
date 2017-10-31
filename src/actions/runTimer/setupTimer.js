import { isFinalIndex } from '../utils'

export default ({ breakpoints, currentIndex, target }) => {
  const isFinalBreakpoint = isFinalIndex(currentIndex, breakpoints)
  const nextTime = isFinalBreakpoint ? breakpoints[0].time : breakpoints[currentIndex + 1].time

  // If time is sunset / sunrise (target === null), set timer target to the next breakpoint
  const targetTime = target ? breakpoints[target].time : breakpoints[currentIndex + 1].time

  return { isFinalBreakpoint, nextTime, targetTime }
}
