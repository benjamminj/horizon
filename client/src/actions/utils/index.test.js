import { formatBreakpoints, isFinalIndex } from './index'

test('should export the variables as functions', () => {
  expect(typeof formatBreakpoints).toEqual('function')
  expect(typeof isFinalIndex).toEqual('function')
})
