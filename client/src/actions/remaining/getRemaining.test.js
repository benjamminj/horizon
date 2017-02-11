import { GET_REMAINING } from '../actionTypes'
import getRemaining from './getRemaining'

test('should return difference between the two times', () => {
  expect(getRemaining(100, 25).remaining).toBe(75)
})

test('should return a type of GET_REMAINING', () => {
  expect(getRemaining(5, 4).type).toEqual(GET_REMAINING)
})
