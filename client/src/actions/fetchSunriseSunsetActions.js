export const FETCH_SUNRISE_SUNSET_REQUEST = 'FETCH_SUNRISE_SUNSET_REQUEST'
export const FETCH_SUNRISE_SUNSET_FAILURE = 'FETCH_SUNRISE_SUNSET_FAILURE'
export const FETCH_SUNRISE_SUNSET_SUCCESS = 'FETCH_SUNRISE_SUNSET_SUCCESS'

export const fetchSunriseSunsetRequest = () => {
  return {
    type: FETCH_SUNRISE_SUNSET_REQUEST
  }
}

export const fetchSunriseSunsetFailure = (err) => {
  return {
    type: FETCH_SUNRISE_SUNSET_FAILURE,
    err
  }
}

export const fetchSunriseSunsetSuccess = (res) => {
  const { results } = res

  return {
    type: FETCH_SUNRISE_SUNSET_SUCCESS,
    results
  }
}
