/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

import isFinalIndex from '../actions/utils/isFinalIndex'

export const mapStateToProps = ({ breakpoints, currentIndex }, ownProps) => {
  const current = breakpoints[currentIndex]
  const next = !isFinalIndex(currentIndex, breakpoints) ? breakpoints[currentIndex + 1] : breakpoints[0]

  const timeBetween = next.time - current.time
  const timeLeft = next.time - Date.now()
  const percentLeft = timeLeft / timeBetween

  const distance = Math.abs(next.lightLevel - current.lightLevel)
  const distanceLeft = distance * percentLeft

  const ascending = next.lightLevel > current.lightLevel
  const percent = ascending ? (next.lightLevel - distanceLeft) : (next.lightLevel + distanceLeft)

  return {
    percent
  }
}

const SunContainer = connect(
  mapStateToProps
)(Sun)

export default SunContainer
