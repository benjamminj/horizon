import isFinalIndex from './isFinalIndex'

const arr = [0, 1, 2, 3]

test('should return true if `i` is the final index of the array', () => {
  expect(isFinalIndex(3, arr)).toBe(true)
})

test('should return false if `i` is not the final index of the array', () => {
  expect(isFinalIndex(2, arr)).toBe(false)
})
