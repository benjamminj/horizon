import * as actions from './index'

test('should export an object', () => {
  expect(actions.toString()).toBe('[object Object]')
})
