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
    increaseCount: (times) => {
      window.setTimeout(() => {
        dispatch(incNow(times))
      }, 1000)
    },
    getTimeLeft: (times) => {
      dispatch(getTimeLeft(times))
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
