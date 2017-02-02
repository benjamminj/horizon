import { reqGeolocationAPI } from './async'

import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
  GET_LOCATION
} from './actionTypes'

function getLocationRequest () {
  return {
    type: GET_LOCATION_REQUEST
  }
}

function getLocationFail (err) {
  return {
    type: GET_LOCATION_FAIL,
    err
  }
}

function getLocation (location) {
  return {
    type: GET_LOCATION,
    location
  }
}

function getLocationSuccess () {
  return {
    type: GET_LOCATION_SUCCESS
  }
}

export default () => {
  return async (dispatch) => {
    dispatch(getLocationRequest())

    try {
      const { latitude: lat, longitude: lng } = await reqGeolocationAPI()

      dispatch(getLocation({ lat, lng }))
      dispatch(getLocationSuccess())
    } catch (err) {
      dispatch(getLocationFail(err))
    }
  }
}
