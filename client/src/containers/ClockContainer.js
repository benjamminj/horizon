import { connect } from 'react-redux'

import Clock from '../components/Clock'
// import { isDay } from '../Utils'

import { getTimeLeft, incNow } from '../actions/times'

const mapStateToProps = (state, ownProps) => {
  const { times, status } = state
  const { now, isLoading, loadSuccess, timeLeft } = times

  return {
    timeLeft,
    now,
    isLoading,
    loadSuccess,
    times,
    status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCount: (status, times) => {
      window.setTimeout(() => {
        dispatch(incNow(status, times))
      }, 1000)
    },
    getTimeLeft: (status, times) => {
      dispatch(getTimeLeft(status, times))
    }
  }
}

const ClockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock)

export default ClockContainer
