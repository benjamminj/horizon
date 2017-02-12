import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import refreshSunriseTimes from './refreshSunriseTimes'

jest.mock('../breakpoints', () => {
  const mockAction = breakpoints => {
    return {
      type: 'mock',
      breakpoints
    }
  }

  return {
    updateSunriseTimes (breakpoints, location) {
      return async (dispatch) => {
        if (breakpoints) {
          return dispatch(mockAction(breakpoints))
        } else {
          throw new Error('error')
        }
      }
    }
  }
})

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
const store = mockStore(initialState)

describe('ok response', () => {
  const oldTimes = [
    { name: 'time0' },
    { name: 'time1' },
    { name: 'time2' },
    { name: 'time3' },
    { name: 'time4' },
    { name: 'time5' }
  ]

  const location = { lat: 30, lng: 100 }

  beforeAll(done => {
    require('../breakpoints')
    store.dispatch(refreshSunriseTimes(oldTimes, location)).then(done)
  })

  test('should dispatch actions dispatched by updateSunriseTimes', () => {
    const actions = store.getActions()
    expect(actions[0].type).toBe('mock')
  })

  test('should return the breakpoints', async () => {
    const breakpoints = await store.dispatch(refreshSunriseTimes(oldTimes, location))
    expect(Array.isArray(breakpoints)).toBe(true)
    expect(breakpoints[0].toString()).toBe('[object Object]')
    expect(breakpoints.find(b => /time\d/.test(b.name))).toBeDefined()
  })

  test('should throw error to be passed upwards', () => {
    expect(store.dispatch(refreshSunriseTimes())).toThrow()
  })
})
