import { getLocation } from '../location'
import { getBreakpoints } from '../breakpoints'

export default () => {
  return async (dispatch) => {
    try {
      const { location } = await dispatch(getLocation())
      const { breakpoints } = await dispatch(getBreakpoints(location))

      return { breakpoints, location }
    } catch (err) {
      throw new Error(err)
    }
  }
}
