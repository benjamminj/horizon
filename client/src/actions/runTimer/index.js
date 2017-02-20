import { getRemaining } from '../remaining'
import setSunHeight from '../sunHeight'

import handleIsTarget from './handleIsTarget'
import handleIsNext from './handleIsNext'
import setupTimer from './setupTimer'

const runTimer = (state) => {
  const { breakpoints, target, location } = state
  let { currentIndex } = state
  const { isFinalBreakpoint, nextTime, targetTime } = setupTimer(state)

  // TODO -- add catch block for error handling
  return async (dispatch) => {
    dispatch(getRemaining(targetTime, Date.now()))
    dispatch(setSunHeight(breakpoints, currentIndex))

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

      // Only refresh the sun height every 30 seconds since it repaints most of DOM
      if (new Date().getSeconds() % 30 === 0) {
        dispatch(setSunHeight(breakpoints, currentIndex))
      }
    }, 1000)
  }
}

export default runTimer
