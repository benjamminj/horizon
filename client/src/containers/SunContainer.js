/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

const mapStateToProps = ({ breakpoints, currentIndex, remaining }, ownProps) => {
  const current = breakpoints[currentIndex]
  const next = (currentIndex !== breakpoints.length - 1) ? breakpoints[currentIndex + 1] : breakpoints[0]


  const distance = next.time - current.time
  const percentToNext = (distance - remaining) / distance
  const distanceToNext = next.lightLevel * percentToNext
  const percent = next.lightLevel > current.lightLevel ? (next.lightLevel - distanceToNext) : (current.lightLevel - distanceToNext)

  const nightLevelGoneHeight = 30
  const nightDistance = next.lightLevel - current.lightLevel
  const isNight = percent < nightLevelGoneHeight

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
