import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import refreshBreakpoints from './refreshBreakpoints'

// mock dependencies
jest.mock('./index')

// Setup mock store
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

const breakpoints = [
  { name: 'test1' },
  { name: 'test2' },
  { name: 'test3' }
]

const location = { lat: 30, lng: 100 }

afterEach(() => {
  store.clearActions()
})

test('should dispatch updateSunriseBreakpoints if isSunset is true', () => {
  store.dispatch(refreshBreakpoints(true, breakpoints, location))
  const actions = store.getActions()
  expect(actions[0].type).toBe('mock_refresh_update_sunrise')
})

test('shojld dispatch getBreakpoints if isSunrise is false', () => {
  store.dispatch(refreshBreakpoints(false, breakpoints, location))
  const actions = store.getActions()
  expect(actions[0].type).toBe('mock_refresh_get_breakpoints')
})
