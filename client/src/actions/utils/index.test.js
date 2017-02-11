import * as utils from './index'

test('should export an object', () => {
  expect(utils.toString()).toEqual('[object Object]')
})
