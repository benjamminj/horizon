import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { GET_LOCATION } from '../actionTypes'
import getLocation from './getLocation'

jest.mock('../apiRequests')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
const store = mockStore(initialState)

jest.mock('../apiRequests')

describe('ok response', () => {
  beforeAll(done => {
    const { __configureGeolocation } = require('../apiRequests')

    __configureGeolocation()
    store.dispatch(getLocation()).then(done)
  })

  test('should dispatch a get location action', () => {
    const actions = store.getActions()
    expect(actions[0].type).toBe(GET_LOCATION)
  })

  test('should return an object with the `lat` & `lng`', () => {
    const actions = store.getActions()
    const { location } = actions[0]
    expect(location.toString()).toBe('[object Object]')
    expect(location.lat).toBe(30)
    expect(location.lng).toBe(100)
  })
})

describe('error', () => {
  beforeAll(() => {
    const { __configureGeolocation } = require('../apiRequests')

    __configureGeolocation('error')
  })

  test('should throw an error to pass upwards', () => {
    expect(store.dispatch(getLocation())).toThrow()
  })
})

