import fetch from 'isomorphic-fetch'

export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST'
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE'
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS'

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

export const fetchLocation = () => {
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
