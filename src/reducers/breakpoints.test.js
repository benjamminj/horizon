import breakpointsReducer from './breakpoints'
import { GET_BREAKPOINTS, UPDATE_AM_BREAKPOINTS } from '../actions/actionTypes'

const state = ['test1', 'test2', 'test3']

const getBreakpointsAction = {
  type: GET_BREAKPOINTS,
  breakpoints: ['breakpoints1', 'breakpoints2']
}

const updateAMBreakpointsAction = {
  type: UPDATE_AM_BREAKPOINTS,
  breakpoints: ['am1', 'am2', 'am3', 'am4']
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of empty array', () => {
  expect(breakpointsReducer(undefined, unknownAction)).toEqual([])
})

test('should return previous state if action is unknown', () => {
  const breakpoints = breakpointsReducer(state, unknownAction)
  expect(breakpoints).toHaveLength(3)
  expect(breakpoints).toContain('test1')
  expect(breakpoints).toContain('test2')
  expect(breakpoints).toContain('test3')
})

test('should return breakpoints from action if action === GET_BREAKPOINTS', () => {
  const breakpoints = breakpointsReducer(state, getBreakpointsAction)
  expect(breakpoints).toHaveLength(2)
  expect(breakpoints).toContain('breakpoints1')
  expect(breakpoints).toContain('breakpoints2')
})

test('should return breakpoints from action if action === UPDATE_AM_BREAKPOINTS', () => {
  const breakpoints = breakpointsReducer(state, updateAMBreakpointsAction)
  expect(breakpoints).toHaveLength(4)
  expect(breakpoints).toContain('am1')
  expect(breakpoints).toContain('am2')
  expect(breakpoints).toContain('am3')
  expect(breakpoints).toContain('am4')
})
