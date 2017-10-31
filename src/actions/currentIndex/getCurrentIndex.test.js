import getCurrentIndex from './getCurrentIndex'

const mockBreakpoints = [
  { time: 1000 },
  { time: 2000 },
  { time: 3000 },
  { time: 4000 },
  { time: 5000 }
]

test('should return final index if `now` param is above final index', () => {
  expect(getCurrentIndex(mockBreakpoints, 10000).currentIndex).toBe(4)
})

test('should return an index if `now` param is bw two indexes', () => {
  expect(getCurrentIndex(mockBreakpoints, 3500).currentIndex).toBe(2)
  expect(getCurrentIndex(mockBreakpoints, 4325).currentIndex).toBe(3)
})

test('returned object should have a `type` property', () => {
  expect(getCurrentIndex(mockBreakpoints, 32).type).toBeDefined()
})
