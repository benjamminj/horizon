export default (state = false, action) => {
  switch (action.type) {
    case 'APP_LOAD_SUCCESS':
      return action.loaded
    default:
      return state
  }
}
