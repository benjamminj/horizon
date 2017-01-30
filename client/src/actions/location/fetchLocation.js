import fetch from 'isomorphic-fetch'

import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS
} from './actionTypes'

const fetchLocationRequest = () => {
  return {
    type: FETCH_LOCATION_REQUEST
  }
}

const fetchLocationFailure = (err) => {
  return {
    type: FETCH_LOCATION_FAILURE,
    err
  }
}

const fetchLocationSuccess = (res) => {
  return {
    type: FETCH_LOCATION_SUCCESS,
    res
  }
}

export default () => {
  return async (dispatch) => {
    dispatch(fetchLocationRequest())

    try {
      const res = await fetch('//freegeoip.net/json/')
      const { latitude, longitude } = await res.json()

      dispatch(fetchLocationSuccess({ lat: latitude, lng: longitude }))
    } catch (err) {
      dispatch(fetchLocationFailure(err))
    }
  }
}
