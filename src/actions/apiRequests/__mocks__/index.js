export const reqSunriseSunsetAPI = (location) => {
  return new Promise((resolve, reject) => {
    if (location) {
      const baseDate = 1486794165218 // Feb 10, 2017 @ 10:23pm PST in UTC
      const minute = 1000 * 60

      const results = {
        astronomical_twilight_begin: new Date(baseDate),
        nautical_twilight_begin: new Date(baseDate + (minute * 30)),
        civil_twilight_begin: new Date(baseDate + (minute * 60)),
        sunrise: new Date(baseDate + (minute * 90)),
        solar_noon: new Date(baseDate + (minute * 60 * 4)),
        day_length: 50000000,
        sunset: new Date(baseDate + (minute * 60 * 7)),
        civil_twilight_end: new Date(baseDate + (minute * 60 * 7.5)),
        nautical_twilight_end: new Date(baseDate + (minute * 60 * 8)),
        astronomical_twilight_end: new Date(baseDate + (minute * 60 * 9))
      }

      resolve({ results })
    } else {
      reject(new Error('error fetching sunrise and sunset data'))
    }
  })
}

let ok = null
export const __configureGeolocation = (error) => {
  if (error) {
    ok = false
  } else {
    ok = true
  }
}

export const reqGeolocationAPI = () => {
  return new Promise((resolve, reject) => {
    if (ok) {
      resolve({ latitude: 30, longitude: 100 })
    } else {
      reject(new Error('someting terrible happened'))
    }
  })
}
