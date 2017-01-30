export const INC_NOW = 'INC_NOW'

export const incNow = (times) => {
  const { now, sunrise, sunset, isDay } = times

  const newNow = now + 1000

  return {
    type: INC_NOW,
    now: newNow,
    timeLeft: isDay ? sunset - newNow : sunrise - newNow
  }
}
