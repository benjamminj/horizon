import formatBreakpoints from './formatBreakpoints'

const baseTime = 1000000
const mockData = {
  astronomical_twilight_begin: baseTime,
  nautical_twilight_begin: (1.5 * baseTime),
  civil_twilight_begin: (2 * baseTime),
  sunrise: (2.5 * baseTime),
  solar_noon: (5 * baseTime),
  day_length: 1000000,
  sunset: (7.5 * baseTime),
  civil_twilight_end: (9 * baseTime),
  nautical_twilight_end: (10 * baseTime),
  astronomical_twilight_end: (12 * baseTime)
}

const breakpoints = formatBreakpoints(mockData)
const endTimes = breakpoints.filter(el => /^(sunrise|sunset)+_end$/.test(el.id))

test('should return an array of objects with the breakpoints', () => {
  expect(Array.isArray(breakpoints)).toBe(true)
  expect(breakpoints[0].toString()).toBe('[object Object]')
})

test('should be in order from highest to lowest times', () => {
  const isInOrder = breakpoints.every((el, i, arr) => i === 0 || el.time > arr[i - 1].time)
  expect(isInOrder).toBe(true)
})

test('should have corresponding light level for each entry', () => {
  const containsLightLevels = breakpoints.every(el => el.lightLevel !== undefined)
  expect(containsLightLevels).toBe(true)
})

test('should remove `day_length` from the breakpoints', () => {
  const containsDayLength = breakpoints.find(el => el.id === 'day_length')
  expect(containsDayLength).toBeUndefined()
})

test('should add sunrise and sunset end times', () => {
  const hasSunriseEnd = breakpoints.findIndex(el => el.id === 'sunrise_end')
  const hasSunsetEnd = breakpoints.findIndex(el => el.id === 'sunset_end')

  expect(endTimes).toHaveLength(2)
  expect(hasSunriseEnd).not.toBeUndefined()
  expect(hasSunsetEnd).not.toBeUndefined()
})

test('should have sunrise / sunset end times be 5 minutes after sunrise / sunset', () => {
  const sunriseEnd = endTimes.find(el => el.id === 'sunrise_end')
  const sunsetEnd = endTimes.find(el => el.id === 'sunset_end')

  const fiveMinutes = 5 * 60 * 1000
  expect(sunriseEnd.time).toBe((2.5 * baseTime) + fiveMinutes)
  expect(sunsetEnd.time).toBe((7.5 * baseTime) + fiveMinutes)
})

test('should match the id and time to the data given', () => {
  const breakpointsSolarNoon = breakpoints.find(el => el.id === 'solar_noon')
  const mockSolarNoon = mockData.solar_noon

  expect(breakpointsSolarNoon.time).toEqual(mockSolarNoon)
})

// The following tests use these variables

const sunriseIndex = breakpoints.findIndex(el => el.id === 'sunrise')
const sunsetIndex = breakpoints.findIndex(el => el.id === 'sunset')

const beforeSunrise = breakpoints.slice(0, sunriseIndex)
const afterSunset = breakpoints.slice(sunsetIndex + 1)

const bwSunsetAndSunrise = beforeSunrise.concat(afterSunset)
const bwSunriseAndSunset = breakpoints.slice(sunsetIndex + 1, sunsetIndex)

test('should have `waiting_sunrise` status for all indexes after sunset & before sunrise', () => {
  const isNotWaitingSunrise = bwSunsetAndSunrise.find(el => el.status !== 'waiting_sunrise')

  expect(isNotWaitingSunrise).toBeUndefined()
})

test('should have `waiting_sunset` status for all indexes between sunrise and sunset', () => {
  const isNotWaitingSunset = bwSunriseAndSunset.find(el => el.status !== 'waiting_sunset')

  expect(isNotWaitingSunset).toBeUndefined()
})

test('should not have a `waiting_` status for sunrise / sunset', () => {
  const isWaiting = /^waiting_/

  expect(breakpoints[sunriseIndex].status).not.toMatch(isWaiting)
  expect(breakpoints[sunsetIndex].status).not.toMatch(isWaiting)
})

test('should have `lightLevel < sunrise` if has waiting_sunrise status', () => {
  const isAboveSunrise = bwSunsetAndSunrise.find(el => el.lightLevel > breakpoints.lightLevel)
  expect(isAboveSunrise).toBeUndefined()
})

test('should have `lightLevel` above sunrise and sunset if has waiting_sunset status', () => {
  const isBelowSunrise = bwSunriseAndSunset.find(el => el.lightLevel < breakpoints.lightLevel)
  const isBelowSunset = bwSunriseAndSunset.find(el => el.lightLevel < breakpoints.lightLevel)

  expect(isBelowSunrise).toBeUndefined()
  expect(isBelowSunset).toBeUndefined()
})
