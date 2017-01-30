// const SUNRISE_BG = `linear-gradient(to top, #fed660, #fd8236)`
const SUNSET_BG = `linear-gradient(to top, #fed660, #fd8236)`

export default (props) => {
  const { isDay } = props

  return {
    background: isDay ? 'orange' : SUNSET_BG
  }
}
