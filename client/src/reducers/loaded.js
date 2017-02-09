export default (state = false, action) => {
  switch (action.type) {
    case 'APP_LOAD_SUCCESS':
      return action.loaded
    case 'APP_LOAD_FAIL':
      return action.loaded
    default:
      return state
  }
}
