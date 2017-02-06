import { connect } from 'react-redux'

import { onAppLoad } from '../actions/async'
import getRemaining from '../actions/getRemaining'

import App from '../components/App'

function mapStateToProps ({ loaded, target, breakpoints }) {
  return {
    loaded,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

