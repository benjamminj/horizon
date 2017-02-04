import { connect } from 'react-redux'

import { onAppLoad } from '../actions/async'
import getRemaining from '../actions/getRemaining'

import App from '../components/App'

function mapStateToProps (state) {
  const { remaining, target, breakpoints } = state

  return {
    loaded: remaining ? true : false, //eslint-disable-line
    target,
    breakpoints
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onAppLoad: () => dispatch(onAppLoad()),
    startTimer: (targetTime) => {
      setInterval(() => {
        dispatch(getRemaining(targetTime))
      }, 1000)
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
