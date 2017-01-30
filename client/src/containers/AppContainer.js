import { connect } from 'react-redux'

import { fetchTimes } from '../actions/times'
import { fetchLocation } from '../actions/location'

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
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
