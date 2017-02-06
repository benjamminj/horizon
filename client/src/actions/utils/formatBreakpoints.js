import { toUTC } from '../../Utils'

const levels = [
  { name: 'waiting_sunrise', cond: /_twilight_|sunset_end/ },
  { name: 'sunrise', cond: /^sunrise$/ },
  { name: 'waiting_sunset', cond: /^solar_noon$|sunrise_end/ },
  { name: 'sunset', cond: /^sunset$/ }
]

const lightLevels = [
  { cond: /astronomical_twilight_end/, val: 0 }, // night
  { cond: /astronomical_twilight_begin|nautical_twilight_end/, val: 5 }, // astronomical twilight
  { cond: /nautical_twilight_begin|civil_twilight_end/, val: 10 }, // nautical twilight
  { cond: /civil_twilight_begin|sunset_end/, val: 15 }, // civil twilight
  { cond: /^sun+(rise|set)$/, val: 50 }, // sunrise / sunset
  { cond: /^sunrise_end$/, val: 55 }, // sunrise end
  { cond: /solar_noon/, val: 100 } // noon
]

export default function (data) {
  const keys = Object.keys(data)
  const vals = Object.values(data)

  return keys.map((key, i) => {
    return {
      id: key,
      time: toUTC(new Date(vals[i])),
      status: levels.find((el) => el.cond.test(key)).name,
      lightLevel: lightLevels.find((el) => el.cond.test((key))).val
    }
  }).sort((cur, next) => cur.time - next.time)
}
