import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import onAppLoad from './index'

jest.mock('./fetchRemoteData')
jest.mock('./refreshSunriseTimes')

jest.mock('../currentIndex')

jest.mock('./runTimer', () => {
  const mockRunTimer = (state) => {
    const mockAction = (state) => {
      return {
        type: 'mock_run_timer',
        state
      }
    }

    return dispatch => {
      dispatch(mockAction(state))
    }
  }

  return mockRunTimer
})

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
let store

describe('default', () => {
  beforeAll(done => {
    store = mockStore(initialState)
    store.dispatch(onAppLoad()).then(done)
  })

  afterEach(() => {
    store
  })

  test('should dispatch all of the default actions (5)', () => {
    const actions = store.getActions()
    expect(actions).toHaveLength(5)
    expect(actions[0].type).toBe('mock_fetch_data')
    expect(actions[1].type).toBe('mock_get_current_index')
    expect(actions[2].type).toBe('GET_TARGET')
    expect(actions[3].type).toBe('mock_run_timer')
    expect(actions[4].type).toBe('APP_LOAD_SUCCESS')
  })
})

describe('refresh data for evening', () => {
  beforeAll(done => {
    const { __setPastSunrise } = require('../currentIndex')
    __setPastSunrise()

    store = mockStore(initialState)
    store.dispatch(onAppLoad()).then(done)
  })

  test('should dispatch refreshSunriseTimes action if the currentIndex is above 6', () => {
    const actions = store.getActions()
    expect(actions).toHaveLength(6)
    expect(actions[0].type).toBe('mock_fetch_data')
    expect(actions[1].type).toBe('mock_get_current_index')
    expect(actions[2].type).toBe('mock_refresh_sunrise_times')
    expect(actions[3].type).toBe('GET_TARGET')
    expect(actions[4].type).toBe('mock_run_timer')
    expect(actions[5].type).toBe('APP_LOAD_SUCCESS')
  })
})

describe('error', () => {
  beforeAll(done => {
    const { __setToError } = require('./fetchRemoteData')
    __setToError()

    store = mockStore(initialState)
    store.dispatch(onAppLoad()).then(done)
  })

  test('should dispatch the app fail action', () => {
    const actions = store.getActions()
    expect(actions[0].type).toBe('APP_LOAD_FAIL')
  })
})
