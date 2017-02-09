/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

const mapStateToProps = ({ breakpoints, currentIndex }, ownProps) => {

  const current = breakpoints[currentIndex]
  const next = (currentIndex !== breakpoints.length - 1) ? breakpoints[currentIndex + 1] : breakpoints[0]

  const timeBetween = next.time - current.time
  const timeToNext = (next.time - Date.now())

  const percentToNext = timeToNext / timeBetween

  const distanceToNext = next.lightLevel > current.lightLevel ? (next.lightLevel * percentToNext) : current.lightLevel * percentToNext

  const percent = next.lightLevel > current.lightLevel ? (next.lightLevel - distanceToNext) : (current.lightLevel - distanceToNext)

  return {
    percent
  }
}

const SunContainer = connect(
  mapStateToProps
)(Sun)

export default SunContainer
