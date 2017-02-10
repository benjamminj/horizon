import getRemaining from '../getRemaining'
import getTarget from '../getTarget'
import { getBreakpoints, updateSunriseTimes } from '../breakpoints'
import { isFinalIndex } from '../utils'
import { incCurrentIndex } from '../currentIndex'

// TODO -- Need to move into updateBreakpoints.js
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

const handleIsTarget = ({ breakpoints, currentIndex, target, location }) => {
  return async (dispatch) => {
    try {
      const isSunset = target === 6
      breakpoints = await dispatch(refreshBreakpointsData(isSunset, breakpoints, location))

      const updatedCurrentIndexData = dispatch(incCurrentIndex(currentIndex, false))
      currentIndex = updatedCurrentIndexData.currentIndex

      const updatedTargetData = dispatch(getTarget(breakpoints[target + 1].status))
      target = updatedTargetData.target

      return { breakpoints, currentIndex, target, location }
    } catch (err) {
      throw new Error(err)
    }
  }
}

const handleIsNext = ({ currentIndex, isFinalBreakpoint, targetTime, now }) => {
  return async (dispatch) => {
    const updatedIndex = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
    currentIndex = updatedIndex.currentIndex
    dispatch(getRemaining(targetTime, now))

    return currentIndex
  }
}

const setupTimer = ({ breakpoints, currentIndex, target }) => {
  const isFinalBreakpoint = isFinalIndex(currentIndex, breakpoints)
  const nextTime = isFinalBreakpoint ? breakpoints[0].time : breakpoints[currentIndex + 1].time

  // If time is sunset / sunrise (target === null), set timer target to the next breakpoint
  const targetTime = target ? breakpoints[target].time : breakpoints[currentIndex + 1].time

  return { isFinalBreakpoint, nextTime, targetTime }
}

const runTimer = (state) => {
  const { breakpoints, target, location } = state
  let { currentIndex } = state
  const { isFinalBreakpoint, nextTime, targetTime } = setupTimer(state)

  return async (dispatch) => {
    dispatch(getRemaining(targetTime, Date.now()))

    const timer = setInterval(async () => {
      const now = Date.now()

      if (targetTime <= now + 999) {
        clearInterval(timer)
        state = await dispatch(handleIsTarget(state))
        dispatch(runTimer(state))
      } else if (nextTime <= now + 999) {
        clearInterval(timer)
        currentIndex = await dispatch(handleIsNext({ currentIndex, isFinalBreakpoint, targetTime, now }))
        dispatch(runTimer({ breakpoints, currentIndex, target, location }))
      } else {
        dispatch(getRemaining(targetTime, now))
      }
    }, 1000)
  }
}

export default runTimer
