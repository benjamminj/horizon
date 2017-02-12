import setupTimer from './setupTimer'

const breakpoints = [
  { time: 0 },
  { time: 100 },
  { time: 200 },
  { time: 300 },
  { time: 400 },
  { time: 500 }
]

const currentIndex = 2
const target = 4

const mockState = { breakpoints, currentIndex, target }

test('should return object containing `isFinalBreakpoint`, `nextTime`, & `targetTime`', () => {
  const setup = setupTimer(mockState)
  const keys = Object.keys(setup)

  expect(setup.toString()).toBe('[object Object]')
  expect(keys.includes('isFinalBreakpoint')).toBe(true)
  expect(keys.includes('nextTime')).toBe(true)
  expect(keys.includes('targetTime')).toBe(true)
})

test('should return `isFinalBreakpoint: true` if `currentIndex === breakpoints.length`', () => {
  const currentIndex = breakpoints.length - 1
  const { isFinalBreakpoint } = setupTimer({ breakpoints, currentIndex, target })
  expect(isFinalBreakpoint).toBe(true)
})

test('should return the next time', () => {
  const { nextTime } = setupTimer(mockState)
  expect(nextTime).toBe(300)
})

test('should return the target time of object at target index', () => {
  const { targetTime } = setupTimer(mockState)
  expect(targetTime).toBe(400)
})

test('should return the next time when target is null', () => {
  const { targetTime } = setupTimer({ breakpoints, currentIndex, target: null })
  expect(targetTime).toBe(300)
})
