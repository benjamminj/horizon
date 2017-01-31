/* eslint-disable */
const NIGHT = [0, 0, 0]
const RED = [255, 0, 0]

const BLUE = [0, 0, 255]
const PURPLE = blend(RED, BLUE, 0.5)

function blend (color1, color2, percent) {
  return color1.map((val, i) => Math.floor((val * (1 - percent)) + (color2[i] * percent)))
}

function generateBackground (color1, color2, color3) {
  const intColor1 = blend(color1, color2, 0.5)
  const intColor2 = blend(color2, color3, 0.5)

  return `radial-gradient(ellipse 800% 100% at 50% 100%, rgb(${color1}), rgb(${intColor1}), rgb(${color2}), rgb(${intColor2}), rgb(${color3}))`
}

export default (status, times) => {
  const { isDay } = status // eslint-disable-line
  const { isLoading, loadSuccess } = times

  // colors need to be a radial gradient

  return {
    background: !isLoading && loadSuccess ? `rgb(${BLUE})` : `rgb(${RED})`
  }
}
