import { reqSunriseSunsetAPI } from './async/apiRequests'
import { toUTC } from '../Utils'

import { UPDATE_AM_BREAKPOINTS } from './constants/actionTypes'

export function updateSunriseTimes (breakpoints, location) {
  return async (dispatch) => {
    try {
      const tomorrow = new Date((Date.now() + (1000 * 60 * 60 * 24)))

      const { results } = await reqSunriseSunsetAPI(location, tomorrow)

      delete results.day_length

      addEndTime(results, 'sunrise')
      addEndTime(results, 'sunset')

      const mergeData = formatBreakpoints(results).slice(0, 4)

      const oldData = breakpoints.slice(4)

      return dispatch(updateAMBreakpoints(mergeData.concat(oldData)))
    } catch (err) {
      console.log(err)
    }
  }
}

function formatBreakpoints (data) {
  const keys = Object.keys(data)
  const vals = Object.values(data)

  console.log(keys, vals)

  const levels = [
    { name: 'waiting_sunrise', cond: /_twilight_|sunset_end/ },
    { name: 'sunrise', cond: /^sunrise$/ },
    { name: 'waiting_sunset', cond: /^solar_noon$|sunrise_end/ },
    { name: 'sunset', cond: /^sunset$/ }
  ]

  const breakpoints = keys.map((key, i) => {
    return {
      id: key,
      time: toUTC(new Date(vals[i])),
      status: levels.find((el) => el.cond.test(key)).name
    }
  }).sort((cur, next) => cur.time - next.time)

  return breakpoints
}

function updateAMBreakpoints (newBreakpoints) {
  return {
    type: UPDATE_AM_BREAKPOINTS,
    breakpoints: newBreakpoints
  }
}

function addEndTime (obj, key) {
  const date = new Date(obj[key])

  obj[`${key}_end`] = date.setMinutes(date.getMinutes() + 5)
}
