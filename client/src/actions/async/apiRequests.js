/* eslint-disable */
import fetch from 'isomorphic-fetch'
import { SUNRISE_SUNSET_API, GEOLOCATION_API } from '../urls' // eslint-disable-line

export const reqSunriseSunsetAPI = async (lat, lng) => {
  const today = new Date(Date.now())
  const date = [today.getFullYear(), today.getMonth() + 1, today.getDate()]

  try {
    const res = await fetch(`${SUNRISE_SUNSET_API}/api/sunrise-sunset/lat=${lat}&lng=${lng}&date=${date.join('-')}`)
    const json = await res.json()

    return json
  } catch (err) {
    return err
  }
}
