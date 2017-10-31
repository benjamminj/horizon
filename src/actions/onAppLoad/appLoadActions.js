import { APP_LOAD_SUCCESS, APP_LOAD_FAIL } from '../actionTypes'

export const appLoaded = () => {
  return {
    type: APP_LOAD_SUCCESS,
    loaded: true
  }
}

export const appLoadFail = () => {
  return {
    type: APP_LOAD_FAIL,
    loaded: false
  }
}
