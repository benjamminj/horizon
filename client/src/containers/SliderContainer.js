import { connect } from 'react-redux'
import Slider from '../components/Slider'

import * as actions from '../actions/setCustomSunHeight'

export function mapStateToProps ({ sunHeight }) {
  return {
    sunHeight: sunHeight
  }
}

export function mapDispatchToProps (dispatch) {
  return {
    resumeAutoSunHeight: ({ customHeight, autoHeight }) => {
      const diff = Math.abs(customHeight - autoHeight)
      const middle = diff / 4
      let result

      console.log(customHeight, autoHeight)
      for (let i = 0; i <= Math.ceil(middle); i++) {
        const isHigher = customHeight > autoHeight

        if (i < middle) {
          const amt = i * 4
          result = isHigher ? customHeight - amt : customHeight + amt
          console.log(result, autoHeight)

          setTimeout(() => {
            dispatch(actions.setCustomSunHeight(result))
          }, (i * 50))
        } else {
          setTimeout(() => {
            dispatch(actions.setCustomSunHeight(autoHeight))
            dispatch(actions.resumeAutoSunHeight())
            console.log('now this runs')
          }, (i * 50))
        }
      }
    },

    setCustomSunHeight: (autoHeight) => { dispatch(actions.setCustomSunHeight(autoHeight)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider)
