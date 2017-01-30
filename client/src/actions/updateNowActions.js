export const INC_NOW = 'INC_NOW'

export const incNow = (times) => {
  // const { now, sunrise, sunset, isDay } =

  return {
    type: INC_NOW,
    now: times.now + 1000
  }
}
