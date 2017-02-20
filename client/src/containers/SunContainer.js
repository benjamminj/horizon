/* eslint-disable */
import { connect } from 'react-redux'
import Sun from '../components/Sun'

import isFinalIndex from '../actions/utils/isFinalIndex'

export const mapStateToProps = ({ sunHeight, customSunHeight }, ownProps) => {
  return {
    percent: customSunHeight || sunHeight
  }
}

const SunContainer = connect(
  mapStateToProps
)(Sun)

export default SunContainer
