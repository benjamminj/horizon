// const SUNRISE_BG = `linear-gradient(to top, #fed660, #fd8236)`
const SUNSET_BG = `linear-gradient(to top, #fed660, #fd8236)`

export default (status, times) => {
  const { isDay } = status

  return {
    background: isDay ? 'orange' : SUNSET_BG
  }
}
