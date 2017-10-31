import remainingReducer from './remaining'
import { GET_REMAINING } from '../actions/actionTypes'

const state = 10

const getRemainingAction = {
  type: GET_REMAINING,
  remaining: 9
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of `null`', () => {
  expect(remainingReducer(undefined, unknownAction)).toBeNull
})

test('should return previous state if action !== GET_REMAINING', () => {
  expect(remainingReducer(state, unknownAction)).toBe(10)
})

test('should return remaining of action if action === GET_REMAINING', () => {
  expect(remainingReducer(state, getRemainingAction)).toBe(9)
})
