import loadedReducer from './loaded'
import { APP_LOAD_SUCCESS, APP_LOAD_FAIL } from '../actions/actionTypes.js'

const state = false

const appLoadSuccessAction = {
  type: APP_LOAD_SUCCESS,
  loaded: true
}

const appLoadFailAction = {
  type: APP_LOAD_FAIL,
  loaded: false
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of `null`', () => {
  expect(loadedReducer(undefined, unknownAction)).toBeNull()
})

test('should return previous state if action is unknown', () => {
  expect(loadedReducer(state, unknownAction)).toBe(false)
})

test('should return `true` is action === APP_LOAD_SUCCESS', () => {
  expect(loadedReducer(undefined, appLoadSuccessAction)).toBe(true)
})

test('should return `false` is action === APP_LOAD_FAIL', () => {
  expect(loadedReducer(undefined, appLoadFailAction)).toBe(false)
})
