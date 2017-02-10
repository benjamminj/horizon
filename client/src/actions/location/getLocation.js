import { reqGeolocationAPI } from '../async'

import { GET_LOCATION } from '../actionTypes'

function getLocation (location) {
  return {
    type: GET_LOCATION,
    location
  }
}

export default () => {
  return async (dispatch) => {
    try {
      const { latitude: lat, longitude: lng } = await reqGeolocationAPI()
      return dispatch(getLocation({ lat, lng }))
    } catch (err) {
      throw new Error(err)
    }
  }
}
