import { getBreakpoints, updateSunriseBreakpoints } from './index'

// TODO -- add try/catch for error handling?
export default (isSunset, breakpoints, location) => {
  return async (dispatch) => {
    let updatedBreakpointsData

    if (isSunset) {
      updatedBreakpointsData = await dispatch(updateSunriseBreakpoints(breakpoints, location))
    } else {
      updatedBreakpointsData = await dispatch(getBreakpoints(location))
    }

    return updatedBreakpointsData.breakpoints
  }
}
