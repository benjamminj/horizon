import { connect } from 'react-redux'

import { fetchSunriseSunsetData } from '../actions/timeActions'
import { fetchLocation } from '../actions/locationActions'

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
      dispatch(fetchSunriseSunsetData(location))
    },
    fetchLocation: () => {
      dispatch(fetchLocation())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
