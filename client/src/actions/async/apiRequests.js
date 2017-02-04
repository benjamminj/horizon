/* eslint-disable */
import fetch from 'isomorphic-fetch'
import { SUNRISE_SUNSET_API, GEOLOCATION_API } from '../constants/urls' // eslint-disable-line

async function apiRequest (url) {
  try {
    const json = await fetch(url).then((res) => res.json())

    return json
  } catch (err) {
    throw new Error(err)
  }
}

export async function reqSunriseSunsetAPI ({ lat, lng }, date) {
  const formattedDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

  try {
    const json = await apiRequest(`${SUNRISE_SUNSET_API}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=${formattedDate.join('-')}`)

    return json
  } catch (err) {
    return err
  }
}

export async function reqGeolocationAPI () {
  try {
    const json = await apiRequest(GEOLOCATION_API)

    return json
  } catch (err) {
    return err
  }
}
