import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import handleIsTarget from './handleIsTarget'
import { INC_CURRENT_INDEX, GET_TARGET } from '../actionTypes'

jest.mock('../breakpoints')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
let store

const breakpoints = [{ id: 'test1' }, { id: 'test2' }]
const location = { lat: 30, lng: 100 }
const mockState = { breakpoints, currentIndex: 1, target: 3, location }

describe('ok', () => {
  beforeEach(done => {
    store = mockStore(initialState)
    store.dispatch(handleIsTarget(mockState)).then(done)
  })

  test('should dispatch 3 actions', () => {
    const actions = store.getActions()
    expect(actions).toHaveLength(3)
  })

  test('should dispatch a mock action from refreshBreakpoints first', () => {
    const actions = store.getActions()
    expect(/mock_refresh/.test(actions[0].type)).toBe(true)
  })

  test('should dispatch getBreakpoints action if `target !== 6`', () => {
    const actions = store.getActions()
    expect(actions[0].type).toMatch(/mock_refresh_get_breakpoints/)
  })

  test('should dispatch updateSunrise actions if `target === 6`', () => {
    store.clearActions()
    store.dispatch(handleIsTarget({ ...mockState, target: 6 }))
    const actions = store.getActions()

    expect(actions[0].type).toMatch(/mock_refresh_update_sunrise/)
  })

  test('should include INC_CURRENT_INDEX action second', () => {
    const actions = store.getActions()
    expect(actions[1].type).toBe(INC_CURRENT_INDEX)
  })

  test('should include GET_TARGET actions third', () => {
    const actions = store.getActions()
    expect(actions[2].type).toBe(GET_TARGET)
  })
})

describe('error', () => {
  beforeEach(() => {
    const { __setupBreakpointsError } = require('../breakpoints')
    __setupBreakpointsError()

    store = mockStore(initialState)
  })

  test('should throw error to be passed upwards', () => {
    expect(store.dispatch(handleIsTarget(mockState))).toThrow()
  })
})
