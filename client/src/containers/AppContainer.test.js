import { mapStateToProps, mapDispatchToProps } from './AppContainer'

jest.mock('../actions/onAppLoad', () => {
  return () => {
    return {
      type: 'mock_on_app_load'
    }
  }
})

beforeEach(() => {
  require('../actions/onAppLoad')
})

test('should return loaded from state passed into it', () => {
  let { loaded } = mapStateToProps({ loaded: false })
  expect(loaded).toBe(false)

  const newState = mapStateToProps({ loaded: true })
  loaded = newState.loaded
  expect(loaded).toBe(true)
})

test('should return a dispatcher with onAppLoad method', () => {
  const { onAppLoad } = mapDispatchToProps(action => {
    return action
  })

  expect(typeof onAppLoad).toBe('function')
})

test('should dispatch the onAppLoad actions when method is called', () => {
  const { onAppLoad } = mapDispatchToProps(action => action)
  expect(onAppLoad().type).toBe('mock_on_app_load')
})
