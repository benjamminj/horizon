/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

const mapStateToProps = ({ breakpoints, currentIndex, remaining }, ownProps) => {
  const current = breakpoints[currentIndex]
  const next = (currentIndex !== breakpoints.length - 1) ? breakpoints[currentIndex + 1] : breakpoints[0]

  const timeBetween = next.time - current.time
  const timeToNext = timeBetween - (next.time - Date.now())

  const percentToNext = timeToNext / timeBetween
  const distanceToNext = next.lightLevel * percentToNext
  const percent = next.lightLevel > current.lightLevel ? (next.lightLevel - distanceToNext) : (current.lightLevel - distanceToNext)

  const nightLevelGoneHeight = 20
  const isNight = percent < nightLevelGoneHeight
  const nightDistance = Math.abs(next.lightLevel - current.lightLevel)

  const base = next.lightLevel > current.lightLevel ? current.lightLevel : next.lightLevel
  const nightLevel = isNight ? 1 - ((base * percentToNext) / nightLevelGoneHeight) : 0

  console.log((base * percentToNext) / nightLevelGoneHeight)

  return {
    percent,
    nightLevel
  }
}

const SunContainer = connect(
  mapStateToProps
)(Sun)

export default SunContainer
