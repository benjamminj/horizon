import { toUTC } from '../../Utils'
import values from 'object.values'

if (!Object.values) {
  values.shim()
}

const levels = [
  { name: 'waiting_sunrise', cond: /_twilight_|sunset_end/ },
  { name: 'sunrise', cond: /^sunrise$/ },
  { name: 'waiting_sunset', cond: /^solar_noon$|sunrise_end/ },
  { name: 'sunset', cond: /^sunset$/ }
]

const lightLevels = [
  { cond: /astronomical_twilight_end/, day: 0 }, // night
  { cond: /astronomical_twilight_begin|nautical_twilight_end/, day: 10 }, // astronomical twilight
  { cond: /nautical_twilight_begin|civil_twilight_end/, day: 20 }, // nautical twilight
  { cond: /civil_twilight_begin|sunset_end/, day: 45 }, // civil twilight
  { cond: /^sun+(rise|set)$/, day: 50 }, // sunrise / sunset
  { cond: /^sunrise_end$/, day: 55 }, // sunrise end
  { cond: /solar_noon/, day: 100 } // noon
]

const addEndTime = (obj, key) => {
  const date = new Date(obj[key])

  obj[`${key}_end`] = date.setMinutes(date.getMinutes() + 5)
}

export default (data) => {
  delete data.day_length
  addEndTime(data, 'sunrise')
  addEndTime(data, 'sunset')

  const keys = Object.keys(data)
  const vals = Object.values(data)

  return keys.map((key, i) => {
    return {
      id: key,
      time: toUTC(new Date(vals[i])),
      status: levels.find((el) => el.cond.test(key)).name,
      lightLevel: lightLevels.find((el) => el.cond.test((key))).day
    }
  }).sort((cur, next) => cur.time - next.time)
}
