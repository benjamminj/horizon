import { INC_NOW } from './actionTypes'

export default (times) => {
  const { now, sunrise, sunset, isDay } = times

  const newNow = now + 1000

  return {
    type: INC_NOW,
    now: newNow,
    timeLeft: isDay ? sunset - newNow : sunrise - newNow
  }
}
