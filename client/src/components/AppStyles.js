/* eslint-disable */
const RGB_BLUE = [0, 0, 255]
const RGB_ORANGE = [255, 255, 27]
const RGB_RED = [255, 0, 0]
const RGB_GREEN = [0, 255, 0]

const AM_CIVIL_TWILIGHT_BG = generateBackground([191, 90, 46], [156, 179, 177], [61, 94, 129])
const SUNRISE_BG = generateBackground([234, 77, 0], [253, 145, 6], [213, 188, 197])
const DAY_BG = generateBackground([178, 202, 235], [112, 155, 221], [69, 108, 173])
const SUNSET_BG = generateBackground([221, 57, 12], [246, 120, 40], [182, 124, 86])

function blend (color1, color2, percent) {
  return color1.map((val, i) => Math.floor((val * (1 - percent)) + (color2[i] * percent)))
}

function generateBackground (color1, color2, color3) {
  const intColor1 = blend(color1, color2, 0.5)
  const intColor2 = blend(color2, color3, 0.5)

  return `radial-gradient(ellipse 800% 100% at 50% 100%, rgb(${color1}), rgb(${intColor1}), rgb(${color2}), rgb(${intColor2}), rgb(${color3}))`
}

function chooseBackground (lightLevel) {
  switch (lightLevel) {
    case 'AM_CIVIL_TWILIGHT':
      return { background: AM_CIVIL_TWILIGHT_BG }
    case 'SUNRISE':
      return { background: SUNRISE_BG }
    case 'DAY':
      return { background: DAY_BG }
    case 'SUNSET':
      return { background: SUNSET_BG }
    case 'PM_CIVIL_TWILIGHT':
      return { background: 'purple' }
    case 'NIGHT':
      return { background: 'red' }
    default:
      return { background: 'radial-gradient(circle, #222, #222)', transition: 'background 1s ease-all' }
  }
}

export default (lightLevel) => {
  return chooseBackground(lightLevel)
}
