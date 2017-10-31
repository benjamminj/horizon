import { GET_CURRENT_INDEX, INC_CURRENT_INDEX } from '../actions/actionTypes'
import currentIndexReducer from './currentIndex.js'

const state = 2

const getCurrentIndexAction = {
  type: GET_CURRENT_INDEX,
  currentIndex: 5
}

const incCurrentIndexAction = {
  type: INC_CURRENT_INDEX,
  currentIndex: 3
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of `null`', () => {
  expect(currentIndexReducer(undefined, unknownAction)).toBeNull()
})

test('should return previous state if action is unknown', () => {
  expect(currentIndexReducer(state, unknownAction)).toBe(2)
})

test('should return `5` if action === GET_CURRENT_INDEX', () => {
  expect(currentIndexReducer(state, getCurrentIndexAction)).toBe(5)
})

test('should return `3` if action === INC_CURRENT_INDEX', () => {
  expect(currentIndexReducer(state, incCurrentIndexAction)).toBe(3)
})
