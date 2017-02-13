import { connect } from 'react-redux'

import onAppLoad from '../actions/onAppLoad'

import App from '../components/App'

export function mapStateToProps ({ loaded }) {
  return {
    loaded
  }
}

export function mapDispatchToProps (dispatch) {
  return {
    onAppLoad: () => dispatch(onAppLoad())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

