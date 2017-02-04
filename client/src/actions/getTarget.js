import { GET_TARGET } from './constants/actionTypes'

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
