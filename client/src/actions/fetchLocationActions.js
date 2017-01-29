export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST'
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE'
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS'

export const fetchLocationRequest = () => {
  return {
    type: FETCH_LOCATION_REQUEST
  }
}

export const fetchLocationFailure = (err) => {
  return {
    type: FETCH_LOCATION_FAILURE,
    err
  }
}

export const fetchLocationSuccess = (res) => {
  return {
    type: FETCH_LOCATION_SUCCESS,
    res
  }
}
