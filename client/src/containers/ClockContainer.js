import { connect } from 'react-redux'

import Clock from '../components/Clock'

const mapStateToProps = ({ breakpoints, currentIndex, remaining }, ownProps) => {
  const { status } = breakpoints[currentIndex]

  return {
    name: /sunrise$/.test(status) ? 'sunrise' : 'sunset',
    remaining,
    waiting: /^waiting_/.test(status)
  }
}

const ClockContainer = connect(
  mapStateToProps
)(Clock)

export default ClockContainer
