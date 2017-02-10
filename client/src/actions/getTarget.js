import { GET_TARGET } from './actionTypes'

// assumes the breakpoints will always be created with length === 11
const targetIndexes = {
  sunrise: 3,
  sunset: 6
}

export default (status) => {
  return {
    type: GET_TARGET,
    target: /^waiting_/.test(status) ? targetIndexes[status.split('_')[1]] : null
  }
}
