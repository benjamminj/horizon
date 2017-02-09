import locationReducer from './location'
import { GET_LOCATION } from '../actions/constants/actionTypes'

const state = {
  lat: 25,
  lng: 100
}

const getLocationAction = {
  type: GET_LOCATION,
  location: {
    lat: 10,
    lng: 50
  }
}

const unknownAction = {
  type: 'UNKNOWN'
}

test('should have default state of `null`', () => {
  expect(locationReducer(undefined, unknownAction)).toBeNull
})

test('should return previous state if action !== GET_LOCATION', () => {
  const { lat, lng } = locationReducer(state, unknownAction)
  expect(lat).toBe(25)
  expect(lng).toBe(100)
})

test('should return location of action if action === GET_LOCATION', () => {
  const { lat, lng } = locationReducer(state, getLocationAction)
  expect(lat).toBe(10)
  expect(lng).toBe(50)
})
