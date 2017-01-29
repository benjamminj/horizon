export const INC_NOW = 'INC_NOW'

export const incNow = (now) => {
  return {
    type: INC_NOW,
    now: now + 1000
  }
}
