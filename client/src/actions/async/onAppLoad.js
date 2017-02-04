import getLocation from '../getLocation'
import getBreakpoints from '../getBreakpoints'
import getCurrentIndex from '../getCurrentIndex'
import getRemaining from '../getRemaining'
import getTarget from '../getTarget'

export default () => {
  return async (dispatch) => {
    try {
      const { location } = await dispatch(getLocation())
      const { breakpoints } = await dispatch(getBreakpoints(location))
      const { currentIndex } = dispatch(getCurrentIndex(breakpoints))
      const { target } = dispatch(getTarget(breakpoints[currentIndex].status))
      const { remaining } = dispatch(getRemaining(breakpoints[target].time))

      return { loaded: remaining ? true : false } // eslint-disable-line
    } catch (err) {
      return err
    }
  }
}
