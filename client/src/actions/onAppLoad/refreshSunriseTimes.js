import { updateSunriseTimes } from '../breakpoints'

export default (oldBreakpoints, location) => {
  return async (dispatch) => {
    try {
      const { breakpoints } = await dispatch(updateSunriseTimes(oldBreakpoints, location))
      return breakpoints
    } catch (err) {
      throw new Error(err)
    }
  }
}
