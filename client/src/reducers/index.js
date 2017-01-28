import { ADD_LOCATION } from '../actions/actionTypes'

export const sunriseSunsetApp = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      console.log('ADding location')
      const { location } = action
      return { state, ...location }
    default:
      return state
  }
}
