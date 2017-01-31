import { connect } from 'react-redux'

import Clock from '../components/Clock'
// import { isDay } from '../Utils'

import { getTimeLeft, incNow } from '../actions/times'
import { changeLightLevel } from '../actions/status'

const mapStateToProps = (state, ownProps) => {
  const { times, status } = state

  return {
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
    },
    changeLightLevel: (lightLevel) => {
      dispatch(changeLightLevel(lightLevel))
    }
  }
}

const ClockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock)

export default ClockContainer
