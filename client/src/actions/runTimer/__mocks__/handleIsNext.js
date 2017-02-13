export default ({ currentIndex }) => {
  const mockAction = () => {
    return { type: 'mock_handle_is_next' }
  }

  return dispatch => {
    dispatch(mockAction())
    return currentIndex
  }
}
