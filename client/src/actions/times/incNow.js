import { INC_NOW } from './actionTypes'

export default (status, times) => {
  const { now, sunrise, sunset } = times
  const { isDay } = status

  const newNow = now + 1000

  return {
    type: INC_NOW,
    now: newNow,
    timeLeft: isDay ? sunset - newNow : sunrise - newNow
  }
}
