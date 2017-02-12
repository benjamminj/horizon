export default () => {
  const mockAction = () => {
    return {
      type: 'mock_refresh_sunrise_times'
    }
  }

  const mockRefreshedBreakpoints = [
    { id: 'refresh0' },
    { id: 'refresh1' },
    { id: 'refresh2' },
    { id: 'refresh3' },
    { id: 'refresh4' },
    { id: 'refresh5' },
    { id: 'refresh5' },
    { id: 'refresh6' },
    { id: 'refresh7' },
    { id: 'refresh8' },
    { id: 'refresh9' },
    { id: 'refresh10' },
  ]

  return dispatch => {
    dispatch(mockAction())
    return mockRefreshedBreakpoints
  }
}
