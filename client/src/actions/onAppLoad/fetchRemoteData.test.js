import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchRemoteData from './fetchRemoteData'
import { GET_LOCATION, GET_BREAKPOINTS } from '../actionTypes'

jest.mock('../apiRequests')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
const store = mockStore(initialState)

describe('ok response', () => {
  beforeAll(done => {
    const { __configureGeolocation } = require('../apiRequests')

    __configureGeolocation()
    store.dispatch(fetchRemoteData()).then(done)
  })

  test('should dispatch GET_LOCATION & GET_BREAKPOINTS actions', () => {
    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions.find(a => a.type === GET_LOCATION)).toBeDefined()
    expect(actions.find(a => a.type === GET_BREAKPOINTS)).toBeDefined()
  })

  test('should dispatch the GET_LOCATION action first', () => {
    const actions = store.getActions()
    expect(actions[0].type).toBe(GET_LOCATION)
  })

  test('should dispatch the GET_BREAKPOINTS actions second', () => {
    const actions = store.getActions()
    expect(actions[1].type).toBe(GET_BREAKPOINTS)
  })

  test('should return an object containing location with `lat` & `lng`', async () => {
    const { location } = await store.dispatch(fetchRemoteData())
    expect(location).toBeDefined()
    expect(location.toString()).toBe('[object Object]')
    expect(location.lat).toBeDefined()
    expect(location.lng).toBeDefined()
  })

  test('should return an object containing the breakpoints', async () => {
    const { breakpoints } = await store.dispatch(fetchRemoteData())
    expect(breakpoints).toBeDefined()
    expect(Array.isArray(breakpoints)).toBe(true)
    expect(breakpoints[0].toString()).toBe('[object Object]')
  })
})

