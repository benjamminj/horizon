import { INC_CURRENT_INDEX } from './constants/actionTypes'
import incCurrentIndex from './incCurrentIndex'

test('should return 1 higher than currentIndex if isFinalIndex === false', () => {
  expect(incCurrentIndex(2, false).currentIndex).toBe(3)
})

test('should return 0 if isFinalIndex === true', () => {
  expect(incCurrentIndex(4, true).currentIndex).toBe(0)
})

test('should have a type property of INC_CURRENT_INDEX', () => {
  expect(incCurrentIndex(2, false).type).toEqual(INC_CURRENT_INDEX)
})
