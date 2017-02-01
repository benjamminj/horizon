import { connect } from 'react-redux'

import Clock from '../components/Clock'
// import { isDay } from '../Utils'

import { getTimeLeft, incNow } from '../actions/times'
import { changeLightLevel } from '../actions/status'

const mapStateToProps = (state, ownProps) => {
  const { times, status, location } = state

  return {
    times,
    status,
    location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCount: (status, times) => {
      window.setTimeout(() => {
        dispatch(incNow(status, times))
      }, 1000)
    },
    getTimeLeft: (payload) => {
      dispatch(getTimeLeft(payload))
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
