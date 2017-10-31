import mockDate from 'mockdate'
import { mapStateToProps } from './SunContainer'

const baseDate = 1486968162845 // Feb 12, 2017 @ 10:43 PM, PST
mockDate.set(baseDate)

const hour = 1000 * 60 * 60
const breakpoints = [
  {
    id: 'before_sunrise',
    time: baseDate,
    lightLevel: 0
  },
  {
    id: 'sunrise',
    time: baseDate + (1 * hour),
    lightLevel: 20
  },
  {
    id: 'between',
    time: baseDate + (2 * hour),
    lightLevel: 30
  },
  {
    id: 'sunset',
    time: baseDate + (3 * hour),
    lightLevel: 20
  },
  {
    id: 'after_sunset',
    time: baseDate + (4 * hour),
    lightLevel: 10
  }
]

test('should be between light level of current and next when descending', () => {
  mockDate.set(baseDate + (2.5 * hour))
  const { percent } = mapStateToProps({ breakpoints, currentIndex: 2 })

  expect(percent).toBeGreaterThan(20)
  expect(percent).toBeLessThan(30)
})

test('should be between light level of current and next when ascending', () => {
  mockDate.set(baseDate + (0.5 * hour))
  const { percent } = mapStateToProps({ breakpoints, currentIndex: 0 })

  expect(percent).toBeGreaterThan(0)
  expect(percent).toBeLessThan(20)
})

test('should be between final and first index if currentIndex is final', () => {
  // update the first breakpoint so that it happens AFTER last breakpoint
  const breakpointsCopy = breakpoints.slice()
  const beforeSunrise = breakpointsCopy.shift()
  const updatedFirstBreakpoint = { ...beforeSunrise, time: baseDate + (10 * hour) }
  breakpointsCopy.splice(0, 0, updatedFirstBreakpoint)

  mockDate.set(baseDate + (5 * hour))
  const { percent } = mapStateToProps({ breakpoints: breakpointsCopy, currentIndex: 4 })
  expect(percent).toBeGreaterThan(0)
  expect(percent).toBeLessThan(10)
})
