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
      const isHigher = customHeight > autoHeight
      const heightInterval = 4

      const diff = Math.abs(customHeight - autoHeight)
      const middle = diff / heightInterval

      let intHeights = []

      for (let i = 0; i <= Math.ceil(middle); i++) {
        if (i < middle) {
          const amt = i * heightInterval
          const result = isHigher ? customHeight - amt : customHeight + amt

          intHeights.push(result)
        } else {
          intHeights.push(autoHeight)
        }
      }

      intHeights.forEach((el, i, arr) => {
        const interval = 50

        setTimeout(() => {
          dispatch(actions.setCustomSunHeight(el))
        }, (i * interval))

        if (i === arr.length - 1) {
          setTimeout(() => {
            dispatch(actions.resumeAutoSunHeight())
          }, (i * interval))
        }
      })
    },

    setCustomSunHeight: (autoHeight) => { dispatch(actions.setCustomSunHeight(autoHeight)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider)
