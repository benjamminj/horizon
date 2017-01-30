import { connect } from 'react-redux'

import Clock from '../components/Clock'
import { isDay } from '../Utils'

import { incNow } from '../actions/updateNowActions'

const mapStateToProps = (state, ownProps) => {
  const { sunriseSunsetData: data } = state
  const { now, isLoading, loadSuccess, timeLeft } = data

  const day = isDay(data)

  return {
    day,
    timeLeft,
    now,
    isLoading,
    loadSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startCount: (now) => {
      dispatch(incNow(now))
    }
  }
}

const ClockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock)

export default ClockContainer
