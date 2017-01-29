import { updateSunriseTime } from './fetchSunriseSunsetActions'

export const GET_TIME_LEFT = 'GET_TIME_LEFT'
export const HANDLE_TIME_LEFT_AFTER_SUNSET = 'HANDLE_TIME_LEFT_AFTER_SUNSET'
export const HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE = 'HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE'

const handleTimeAfterSunset = (location, now) => {
  const { lat, lng } = location

  return async (dispatch) => {
    try {
      const { sunrise } = await dispatch(updateSunriseTime({ lat, lng }))

      return {
        type: HANDLE_TIME_LEFT_AFTER_SUNSET,
        timeLeft: sunrise - now
      }
    } catch (err) {
      return {
        type: HANDLE_TIME_LEFT_AFTER_SUNSET_FAILURE,
        err
      }
    }
  }
}

export const getTimeLeft = (payload) => {
  const { sunrise, sunset, now, isDay, lat, lng } = payload

  const isAfterSunset = sunrise - now < 0 && sunset - now < 0

  if (isAfterSunset) {
    return handleTimeAfterSunset({ lat, lng }, now)
  } else {
    return {
      type: GET_TIME_LEFT,
      timeLeft: isDay ? sunset - now : sunrise - now
    }
  }
}
