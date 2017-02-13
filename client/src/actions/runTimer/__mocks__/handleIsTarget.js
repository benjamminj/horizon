export default (state) => {
  const mockAction = () => {
    return { type: 'mock_handle_is_target' }
  }

  return async dispatch => {
    dispatch(mockAction())
    return state
  }
}
