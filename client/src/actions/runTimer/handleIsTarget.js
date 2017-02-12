import refreshBreakpointsData from './refreshBreakpointsData'
import { incCurrentIndex } from '../currentIndex'
import getTarget from '../getTarget'

export default ({ breakpoints, currentIndex, target, location }) => {
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
