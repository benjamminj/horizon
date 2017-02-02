import fetch from 'isomorphic-fetch'

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
    type: GET_LOCATION_SUCCESS,
  }
}

export default () => {
  return async (dispatch) => {
    dispatch(getLocationRequest())

    try {
      const res = await fetch('//freegeoip.net/json/')
      const { latitude, longitude } = await res.json()

      dispatch(getLocation({ lat: latitude, lng: longitude }))
      dispatch(getLocationSuccess())
    } catch (err) {
      dispatch(getLocationFail(err))
    }
  }
}
