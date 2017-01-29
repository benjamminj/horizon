import { connect } from 'react-redux'
import Clock from '../components/Clock'

const mapStateToProps = (state, ownProps) => {
  const { isDay, sunset, sunrise, now } = state

  return {
    isDay,
    timeLeft: isDay ? sunset - now : sunrise - now
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
