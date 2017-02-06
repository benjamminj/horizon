import { connect } from 'react-redux'
import Sun from '../components/Sun'

const mapStateToProps = ({ breakpoints, currentIndex, remaining }, ownProps) => {
  const current = breakpoints[currentIndex]
  const next = current === breakpoints.length - 1 ? breakpoints[currentIndex + 1] : breakpoints[0]

  const distance = next.time - current.time
  const percentToNext = (distance - remaining) / distance

  const percent = next.lightLevel * percentToNext

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
