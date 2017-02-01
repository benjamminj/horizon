/* eslint-disable */
function blend (color1, color2, percent) {
  return color1.map((val, i) => Math.floor((val * (1 - percent)) + (color2[i] * percent)))
}

function generateBackground (color1, color2, color3) {
  const intColor1 = blend(color1, color2, 0.5)
  const intColor2 = blend(color2, color3, 0.5)

  return `radial-gradient(ellipse 800% 100% at 50% 100%, rgb(${color1}), rgb(${intColor1}), rgb(${color2}), rgb(${intColor2}), rgb(${color3}))`
}

export default (lightLevel) => {
  switch (lightLevel) {
    case 'AM_CIVIL_TWILIGHT':
      return { background: 'peru' }
    case 'SUNRISE':
      return { background: 'orange', transition: 'background 1s linear' }
    case 'DAY':
      return { background: 'goldenrod' }
    case 'SUNSET':
      return { background: 'aquamarine' }
    case 'PM_CIVIL_TWILIGHT':
      return { background: 'purple' }
    case 'NIGHT':
      return { background: 'red' }
    default:
      return { background: 'green' }
  }
}
