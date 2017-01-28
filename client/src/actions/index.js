const ADD_LOCATION = 'ADD_LOCATION'
const ADD_SUNRISE_SUNSET_RESULTS = 'ADD_SUNRISE_SUNSET_RESULTS'

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
