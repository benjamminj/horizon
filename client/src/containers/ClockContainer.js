import { connect } from 'react-redux'

import Clock from '../components/Clock'
import { isDay } from '../Utils'

const mapStateToProps = (state, ownProps) => {
  const { sunriseSunsetData: data } = state
  const { sunset, sunrise, now } = data

  const day = isDay(data)

  return {
    day,
    timeLeft: day ? sunset - now : sunrise - now
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ClockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock)

export default ClockContainer
