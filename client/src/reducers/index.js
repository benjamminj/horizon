import { ADD_LOCATION } from '../actions/actionTypes'

export const sunriseSunsetApp = (state = { isDay: true, timeLeft: 400 }, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      console.log('ADding location')
      const { location } = action
      return { state, ...location }
    default:
      return state
  }
}
