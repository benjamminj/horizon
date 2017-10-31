import { incCurrentIndex } from '../currentIndex'
import { getRemaining } from '../remaining'

export default ({ currentIndex, isFinalBreakpoint, targetTime, now }) => {
  return async (dispatch) => {
    const updatedIndex = dispatch(incCurrentIndex(currentIndex, isFinalBreakpoint))
    currentIndex = updatedIndex.currentIndex
    dispatch(getRemaining(targetTime, now))

    return currentIndex
  }
}
