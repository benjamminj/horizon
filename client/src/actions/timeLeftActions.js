import { updateSunriseTime } from './fetchSunriseSunsetActions'

export const GET_TIME_LEFT = 'GET_TIME_LEFT'
export const HANDLE_TIME_LEFT_AFTER_SUNSET = 'HANDLE_TIME_LEFT_AFTER_SUNSET'

export const getTimeLeft = (payload) => {
  const { sunrise, sunset, now, isDay } = payload

  const isBeforeSunsetToday = sunrise - now > 0 || sunset - now > 0

  if (isBeforeSunsetToday) {
    return {
      type: GET_TIME_LEFT,
      timeLeft: isDay ? sunset - now : sunrise - now
    }
  } else {
    return async (dispatch) => {
      dispatch()
    }
  }

}

export const handleTimeAfterSunset = (payload) => {
  const { lat, lng } = payload

  return async (dispatch) => {
    dispatch(updateSunriseTime({ lat, lng }))
  }
}

// export const handletimeLeftAfterSunset = (payload) => {
//   const { sunset, sunrise, now, location } = payload
//   const afterSunset = sunrise - now < 0 && sunset - now < 0

//   if (afterSunset) {
//     return async (dispatch) => {
//       dispatch(updateSunrisetime(location))
//   }
// }
