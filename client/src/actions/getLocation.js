import { reqGeolocationAPI } from './async'

import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
  GET_LOCATION
} from './actionTypes'

const getLocationRequest = () => {
  return {
    type: GET_LOCATION_REQUEST
  }
}

const getLocationFail = (err) => {
  return {
    type: GET_LOCATION_FAIL,
    err
  }
}

const getLocation = (location) => {
  return {
    type: GET_LOCATION,
    location
  }
}

const getLocationSuccess = () => {
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
