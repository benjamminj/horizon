import { connect } from 'react-redux'

import { fetchTimes } from '../actions/times'
import { fetchLocation } from '../actions/location'
import { getIsDay } from '../actions/status'

import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  const { location, times } = state

  return {
    times,
    location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTimes: (location) => {
      dispatch(fetchTimes(location))
    },
    fetchLocation: () => {
      dispatch(fetchLocation())
    },
    getIsDay: (prev, state) => {
      dispatch(getIsDay(prev, state))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
