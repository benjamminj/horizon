import { mapStateToProps } from './ClockContainer'

const breakpoints = [
  { name: 'before_sunrise', status: 'waiting_sunrise' },
  { name: 'sunrise', status: 'sunrise' },
  { name: 'in_between', status: 'waiting_sunset' },
  { name: 'sunset', status: 'waiting_sunset' }
]

const mockState = {
  breakpoints,
  currentIndex: 0,
  remaining: 200
}

test('should get `name === sunrise` if status of current breakpoint is `waiting_sunrise`', () => {
  const { name } = mapStateToProps(mockState)
  expect(name).toBe('sunrise')
})

test('should get `name === sunrise` if status of current breakpoint is `sunrise`', () => {
  const { name } = mapStateToProps({ ...mockState, currentIndex: 1 })
  expect(name).toBe('sunrise')
})

test('should get `name === sunset` if status of current breakpoint is `waiting_sunset`', () => {
  const { name } = mapStateToProps({ ...mockState, currentIndex: 2 })
  expect(name).toBe('sunset')
})

test('should get `name === sunset` if status of current breakpoint is `sunset`', () => {
  const { name } = mapStateToProps({ ...mockState, currentIndex: 3 })
  expect(name).toBe('sunset')
})

test('should be `waiting == true` if status of current breakpoint === `waiting`', () => {
  const { waiting } = mapStateToProps(mockState)
  expect(waiting).toBe(true)
})

test('should be `waiting == false` if status of current breakpoint !== `waiting`', () => {
  const { waiting } = mapStateToProps({ ...mockState, currentIndex: 1 })
  expect(waiting).toBe(false)
})
