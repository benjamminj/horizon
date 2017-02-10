import targetReducer from './target'
import { GET_TARGET } from '../actions/actionTypes'

const initialState = 1

const getTargetAction = {
  type: GET_TARGET,
  target: 2
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of `null`', () => {
  expect(targetReducer(undefined, unknownAction)).toBeNull()
})

test('should return state if action !== GET_TARGET', () => {
  expect(targetReducer(initialState, unknownAction)).toBe(1)
})

test('should return target of action if action === GET_TARGET', () => {
  expect(targetReducer(initialState, getTargetAction)).toBe(2)
})
