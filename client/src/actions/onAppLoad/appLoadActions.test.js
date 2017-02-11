import { APP_LOAD_SUCCESS, APP_LOAD_FAIL } from '../actionTypes'
import { appLoaded, appLoadFail } from './appLoadActions'

test('should return APP_LOAD_SUCCESS on app loaded', () => {
  expect(appLoaded().type).toBe(APP_LOAD_SUCCESS)
})

test('should return `loaded === true` on app loaded', () => {
  expect(appLoaded().loaded).toBe(true)
})

test('should return APP_LOAD_FAIL on app load failed', () => {
  expect(appLoadFail().type).toBe(APP_LOAD_FAIL)
})

test('should return `loaded === false` on app load failed', () => {
  expect(appLoadFail().loaded).toBe(false)
})
