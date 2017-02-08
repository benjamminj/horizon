import getRemaining from '../getRemaining'
import getTarget from '../getTarget'
import getBreakpoints from '../getBreakpoints'
import { updateSunriseTimes } from '../updateBreakpoints'
import { isFinalIndex } from '../utils'
import incCurrentIndex from '../incCurrentIndex'

const refreshBreakpointsData = (isSunset, breakpoints, location) => {
  return async (dispatch) => {
    let updatedBreakpointsData

    if (isSunset) {
      updatedBreakpointsData = await dispatch(updateSunriseTimes(breakpoints, location))
    } else {
      updatedBreakpointsData = await dispatch(getBreakpoints(location))
    }

    return updatedBreakpointsData.breakpoints
  }
}

const runTimer = ({ breakpoints, currentIndex, target, location }) => {
  const isFinalBreakpoint = isFinalIndex(currentIndex, breakpoints)
  const targetTime = breakpoints[target].time
  let nextTime = isFinalBreakpoint ? breakpoints[0].time : breakpoints[currentIndex + 1].time

  return async (dispatch) => {
    const timer = setInterval(async () => {
      const now = Date.now()

      if (targetTime <= now + 999) {
        clearInterval(timer)

        // Perhaps abstract into its own function -- refreshData
        const updatedCurrentIndexData = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
        currentIndex = updatedCurrentIndexData.currentIndex

        const isSunset = target === 6 || false
        breakpoints = await dispatch(refreshBreakpointsData(isSunset, breakpoints, location))

        const updatedTargetData = dispatch(getTarget(breakpoints[target + 1].status))
        target = updatedTargetData.target

        dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      } else if (nextTime <= now + 999) {
        clearInterval(timer)

        const updatedIndex = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
        currentIndex = updatedIndex.currentIndex

        dispatch(getRemaining(targetTime, now))
        dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      } else {
        dispatch(getRemaining(targetTime, now))
      }
    }, 1000)
  }
}

export default runTimer
