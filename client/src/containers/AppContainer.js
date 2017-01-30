import { connect } from 'react-redux'

import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  const { location, sunriseSunsetData: times } = state

  return {
    times,
    location
  }
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
