import { ADD_LOCATION, ADD_SUNRISE_SUNSET_RESULTS } from './actionTypes'

export const addLocation = (location) => {
  return {
    type: ADD_LOCATION,
    location
  }
}

export const addSunriseSunsetResults = (results) => {
  return {
    type: ADD_SUNRISE_SUNSET_RESULTS,
    results
  }
}

export default { addLocation, addSunriseSunsetResults }
