/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

const mapStateToProps = ({ breakpoints, currentIndex, remaining }, ownProps) => {
  const current = breakpoints[currentIndex]
  const next = (currentIndex !== breakpoints.length - 1) ? breakpoints[currentIndex + 1] : breakpoints[0]


  const timeBetween = next.time - current.time

  console.log(timeBetween - (next.time - Date.now()))
  const timeToNext = timeBetween - (next.time - Date.now())

  const percentToNext = timeToNext / timeBetween
  const distanceToNext = next.lightLevel * percentToNext
  const percent = next.lightLevel > current.lightLevel ? (next.lightLevel - distanceToNext) : (current.lightLevel - distanceToNext)

  const nightLevelGoneHeight = 40
  const isNight = percent < nightLevelGoneHeight
  const nightDistance = Math.abs(next.lightLevel - current.lightLevel)
  const nightLevel = isNight ? 1 - ((nightDistance * percentToNext) / nightLevelGoneHeight) : 0

  return {
    percent,
    nightLevel
  }
}

const SunContainer = connect(
  mapStateToProps
)(Sun)

export default SunContainer
