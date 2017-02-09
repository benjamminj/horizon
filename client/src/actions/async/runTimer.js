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
  console.log('here')

  const isFinalBreakpoint = isFinalIndex(currentIndex, breakpoints)

  // If time is sunset / sunrise (target === null), set timer target to the next breakpoint
  const targetTime = target ? breakpoints[target].time : breakpoints[currentIndex + 1].time
  let nextTime = isFinalBreakpoint ? breakpoints[0].time : breakpoints[currentIndex + 1].time

  return async (dispatch) => {
    dispatch(getRemaining(targetTime, Date.now()))

    const timer = setInterval(async () => {
      const now = Date.now()

      if (targetTime <= now + 999) {
        clearInterval(timer)
        console.log('case 1') // Status -- failed manual testing

        // Perhaps abstract into its own function -- refreshData
        const updatedCurrentIndexData = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
        currentIndex = updatedCurrentIndexData.currentIndex

        const isSunset = target === 6 || target === 7
        breakpoints = await dispatch(refreshBreakpointsData(isSunset, breakpoints, location))

        const updatedTargetData = dispatch(getTarget(breakpoints[target + 1].status))
        target = updatedTargetData.target

        // runs again -- new breakpoints, new currentIndex, new target (3 or 6), same loc
        dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      } else if (nextTime <= now + 999) {
        console.log('case 2') // Status -- passed manual testing
        clearInterval(timer)

        const updatedIndex = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
        currentIndex = updatedIndex.currentIndex

        dispatch(getRemaining(targetTime, now))
        dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      } else {
        console.log('case 3') // Status -- passed manual testing
        dispatch(getRemaining(targetTime, now))
      }
    }, 1000)
  }
}

export default runTimer
