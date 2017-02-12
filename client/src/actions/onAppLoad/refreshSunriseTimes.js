import { updateSunriseBreakpoints } from '../breakpoints'

export default (oldBreakpoints, location) => {
  return async (dispatch) => {
    try {
      const { breakpoints } = await dispatch(updateSunriseBreakpoints(oldBreakpoints, location))
      return breakpoints
    } catch (err) {
      throw new Error(err)
    }
  }
}
