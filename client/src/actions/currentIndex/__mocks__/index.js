let currentIndex = 2 // default
export const __setPastSunrise = () => {
  currentIndex = 9
}

export const getCurrentIndex = () => {
  return {
    type: 'mock_get_current_index',
    currentIndex
  }
}
