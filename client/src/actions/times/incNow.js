/* eslint-disable */
import { INC_NOW } from './actionTypes'

export default (times) => {
  const { now, timeLeft } = times

  return {
    type: INC_NOW,
    now: now + 1000,
    timeLeft: timeLeft - 1000
  }
}
