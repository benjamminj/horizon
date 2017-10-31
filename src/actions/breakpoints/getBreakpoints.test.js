import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { GET_BREAKPOINTS } from '../actionTypes'
import getBreakpoints from './getBreakpoints'

jest.mock('../apiRequests')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = []
const store = mockStore(initialState)

beforeAll(done => {
  store.dispatch(getBreakpoints({ lat: 30, lng: 40 })).then(done)
})

test('should dispatch the get breakpoints action', () => {
  const actions = store.getActions()
  expect(actions[0].type).toBe(GET_BREAKPOINTS)
})

test('should return and array of breakpoints with the action', () => {
  const actions = store.getActions()
  const { breakpoints } = actions[0]

  expect(Array.isArray(breakpoints)).toBe(true)
  expect(breakpoints[0].toString()).toBe('[object Object]')
})

test('should throw error in catch block to pass upward', () => {
  expect(store.dispatch(getBreakpoints())).toThrow()
})
