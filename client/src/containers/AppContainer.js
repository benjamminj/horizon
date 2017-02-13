import { connect } from 'react-redux'

import onAppLoad from '../actions/onAppLoad'

import App from '../components/App'

function mapStateToProps ({ loaded }) {
  return {
    loaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onAppLoad: () => dispatch(onAppLoad())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

