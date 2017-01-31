/* eslint-disable */

// const SUNRISE_BG = `linear-gradient(to top, #fed660, #fd8236)`
// const SUNSET_BG = `linear-gradient(to top, #fed660, #fd8236)`
const NIGHT = `rgb()`

function blend (color1, color2, percent) {
  return color1.map((val, i) => {
    const blendedColor = (val * (1 - percent)) + (color2[i] * percent)

    return Math.floor(blendedColor)
  })
}

function generateBackground (color1, color2, color3) {

}

export default (status, times) => {
  const { isDay } = status // eslint-disable-line
  const { isLoading, loadSuccess } = times

  // colors need to be a radial gradient

  return {
    background: !isLoading && loadSuccess ? SUNSET_BG : 'black'
  }
}
