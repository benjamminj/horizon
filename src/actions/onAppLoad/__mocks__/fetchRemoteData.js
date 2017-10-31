let error = false // default
export const __setToError = () => {
  error = true
}

export default () => {
  if (error) {
    throw new Error('mock error in fetch remote data')
  } else {
    const mockData = {
      type: 'mock_fetch_data',
      breakpoints: [
        { id: 'type1' },
        { id: 'type2' },
        { id: 'type3' },
        { id: 'type4' },
        { id: 'type5' },
        { id: 'type6' },
        { id: 'type7' },
        { id: 'type8' },
        { id: 'type9' },
        { id: 'type10' },
        { id: 'type11' }
      ],
      location: { lat: 30, lng: 100 }
    }

    return mockData
  }
}
