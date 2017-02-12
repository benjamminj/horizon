import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import handleIsNext from './handleIsNext'
import { INC_CURRENT_INDEX, GET_REMAINING } from '../actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
const store = mockStore(initialState)

const mockState = {
  currentIndex: 2,
  isFinalBreakpoint: false,
  targetTime: 400,
  now: 300
}

beforeAll(done => {
  store.dispatch(handleIsNext(mockState)).then(done)
})

test('should dispatch `INC_CURRENT_INDEX` & `GET_REMAINING`', () => {
  const actions = store.getActions()
  expect(actions).toHaveLength(2)
  expect(actions.find(a => a.type === INC_CURRENT_INDEX)).toBeDefined()
  expect(actions.find(a => a.type === GET_REMAINING)).toBeDefined()
})

test('should dispatch `INC_CURRENT_INDEX` first', () => {
  const actions = store.getActions()
  expect(actions[0].type).toBe(INC_CURRENT_INDEX)
})

test('should dispatch `GET_REMAINING` second', () => {
  const actions = store.getActions()
  expect(actions[1].type).toBe(GET_REMAINING)
})

test('should throw error to be passed upwards', () => {
  expect(store.dispatch(handleIsNext({ ...mockState, currentIndex: undefined }))).toThrow()
})
