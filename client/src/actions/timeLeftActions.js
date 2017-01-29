export const GET_TIME_LEFT = 'GET_TIME_LEFT'

export const getTimeLeft = (payload) => {
  const { sunrise, sunset, now, isDay } = payload

  return {
    type: GET_TIME_LEFT,
    timeLeft: isDay ? sunset - now : sunrise - now
  }
}
