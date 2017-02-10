import { INC_CURRENT_INDEX } from '../actionTypes'

export default (currentIndex, isLastIndex) => {
  return {
    type: INC_CURRENT_INDEX,
    currentIndex: isLastIndex ? 0 : currentIndex + 1
  }
}
