const generateBreakpoints = (baseTime) => {
  return [
    {
      id: 'astronomical_twilight_begin',
      time: baseTime,
      status: 'waiting_sunrise'
    },
    {
      id: 'nautical_twilight_begin',
      time: baseTime * 2,
      status: 'waiting_sunrise'
    },
    {
      id: 'civil_twilight_begin',
      time: baseTime * 3,
      status: 'waiting_sunrise'
    },
    {
      id: 'sunrise',
      time: baseTime * 4,
      status: 'sunrise'
    },
    {
      id: 'sunrise_end',
      time: baseTime * 5,
      status: 'waiting_sunset'
    },
    {
      id: 'solar_noon',
      time: baseTime * 6,
      status: 'waiting_sunset'
    },
    {
      id: 'sunset',
      time: baseTime * 7,
      status: 'waiting_sunrise'
    },
    {
      id: 'civil_twilight_end',
      time: baseTime * 8,
      status: 'waiting_sunrise'
    },
    {
      id: 'nautical_twilight_end',
      time: baseTime * 9,
      status: 'waiting_sunrise'
    },
    {
      id: 'astornomical_twilight_end',
      time: baseTime * 10,
      status: 'waiting_sunrise'
    }
  ]
}

const mockUpdateSunriseAction = () => {
  return {
    type: 'mock_refresh_update_sunrise',
    breakpoints: generateBreakpoints(500)
  }
}

const mockGetBreakpointsAction = () => {
  return {
    type: 'mock_refresh_get_breakpoints',
    breakpoints: generateBreakpoints(100)
  }
}

let ok = true // default
export const __setupRefreshBreakpointsError = () => {
  ok = false
}

export const refreshBreakpoints = (isSunset) => {
  if (ok) {
    return dispatch => {
      if (isSunset) {
        dispatch(mockUpdateSunriseAction())
        return generateBreakpoints(500)
      } else {
        dispatch(mockGetBreakpointsAction())
        return generateBreakpoints(100)
      }
    }
  } else {
    throw new Error('there was an error while refreshing the breakpoints')
  }
}
