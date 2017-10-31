import getTarget from './index'

test('should return null if `status` does not contain `waiting`', () => {
  expect(getTarget('fancy_pants_testing').target).toBeNull()
})

test('should return 3 if `status` says `waiting_sunrise`', () => {
  expect(getTarget('waiting_sunrise').target).toBe(3)
})

test('should return 3 if `status` says `waiting_sunrise`', () => {
  expect(getTarget('waiting_sunset').target).toBe(6)
})
