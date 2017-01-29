export const setBackground = (state) => {

}

export const toUTC = (date) => {
  const args = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ]

  return Date.UTC(...args)
}

export const isDay = (sunriseSunsetData) => {
  const { civilTwilightBegin, civilTwilightEnd, now } = sunriseSunsetData

  return (civilTwilightBegin - now) < 0 && (civilTwilightEnd - now) > 0
}

export default { setBackground, toUTC }
