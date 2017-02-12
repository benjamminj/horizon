import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import handleIsTarget from './handleIsTarget'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {}
let store

const breakpoints = [
  { name: 'test0' },
  { name: 'test1' },
  { name: 'test2' },
  { name: 'test3' },
  { name: 'test4' }
]

const location = { lat: 30, lng: 100 }

const mockState = { breakpoints, currentIndex: 1, target: 3, location }

describe('ok', () => {
  beforeAll(done => {
    store = mockStore(initialState)
    store.dispatch(handleIsTarget(mockState)).then(done)
  })

  test('should be tested!', () => {
    console.log(store.getActions())
  })
})
