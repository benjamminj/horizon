import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { UPDATE_AM_BREAKPOINTS } from '../actionTypes'
import updateBreakpoints from './updateBreakpoints'

jest.mock('../apiRequests')

const middlewares = [ thunk]
const mockStore = configureMockStore(middlewares)

const initialState = []
const store = mockStore(initialState)

beforeAll(done => {
  const initialBreakpoints = [
    { name: 'test0' },
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' },
    { name: 'test4' },
    { name: 'test5' },
    { name: 'test6' }
  ]

  const location = { lat: 30, lng: 100 }

  store.dispatch(updateBreakpoints(initialBreakpoints, location)).then(done)
})

test('should dispatch an update AM breakpoints action', () => {
  const actions = store.getActions()
  expect(actions[0].type).toBe(UPDATE_AM_BREAKPOINTS)
})

test('should have an array of breakpoints in dispatched action', () => {
  const actions = store.getActions()
  const { breakpoints } = actions[0]
  expect(Array.isArray(breakpoints)).toBe(true)
  expect(breakpoints[0].toString()).toBe('[object Object]')
})

test('should throw error in catch block to pass upward', () => {
  expect(store.dispatch(updateBreakpoints())).toThrow()
})
