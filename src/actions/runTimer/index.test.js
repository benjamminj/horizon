import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockDate from 'mockdate'

import { GET_REMAINING } from '../actionTypes'
import runTimer from './index'

// Mock dependencies
jest.mock('./handleIsTarget')
jest.mock('./handleIsNext')

// Set up fake store
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

// Set up fake breakpoints
const baseDate = 1486888356617 // Sun, Feb 12, 2017 @ 12:32 AM PST
const hour = 1000 * 60 * 60
const mockState = {
  breakpoints: [
    { id: 'test0', time: baseDate + (-1 * hour) },
    { id: 'test1', time: baseDate + (0.5 * hour) },
    { id: 'test2', time: baseDate + (1 * hour) },
    { id: 'test3', time: baseDate + (2 * hour) },
    { id: 'test4', time: baseDate + (3 * hour) }
  ],
  target: 3,
  location: { lat: 30, lng: 100 },
  currentIndex: 1
}

describe('ok', () => {
  jest.useFakeTimers()

  afterEach(() => {
    store.clearActions()
    jest.clearAllTimers()
  })

  test('should be getRemaining by default', () => {
    store.dispatch(runTimer(mockState))
    mockDate.set(baseDate + 1000)
    jest.runOnlyPendingTimers()

    const actions = store.getActions()
    expect(actions).toHaveLength(2) // dispatches GET_REMAINING 2x, one before and one during timer
    expect(actions[0].type).toBe(GET_REMAINING)
    expect(actions[1].type).toBe(GET_REMAINING)
  })

  test('should dispatch handleIsTarget if now is within 1s of targetTime', () => {
    mockDate.set(baseDate + (2 * hour) - 700)
    store.dispatch(runTimer(mockState))
    jest.runOnlyPendingTimers()

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(GET_REMAINING)
    expect(actions[1].type).toBe('mock_handle_is_target')
  })

  test('should dispatch handleIsNext if now if within 1s of nextTime', () => {
    mockDate.set(baseDate + (1 * hour) - 700)
    store.dispatch(runTimer(mockState))
    jest.runOnlyPendingTimers()

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(GET_REMAINING)
    expect(actions[1].type).toBe('mock_handle_is_next')
  })
})
