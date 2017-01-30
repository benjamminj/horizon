import { GET_IS_DAY } from './actionTypes'

export default (times) => {
  const { now, civilTwilightBegin, civilTwilightEnd } = times

  return {
    type: GET_IS_DAY,
    isDay: (civilTwilightBegin - now) < 0 && (civilTwilightEnd - now) > 0
  }
}
