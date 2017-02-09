import React from 'react'
import { shallow } from 'enzyme'

import Sun from './Sun'

const props = {
  percent: 50
}

test('should render the component', () => {
  const wrapper = shallow(<Sun {...props} />)
  expect(wrapper.is('.sun')).toBe(true)
})

test('should have `top: -100%` when percent is 50', () => {
  const wrapper = shallow(<Sun {...props} />)
  expect(wrapper.html()).toMatch(/top:-100%/)
})

test('should have `top: -200%` when percent is 100', () => {
  const testProps = { ...props, percent: 100 }
  const wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(/top:-200%/)
})

test('should have `top: -0%` when percent is 0', () => {
  const testProps = { ...props, percent: 0 }
  const wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(/top:-0%/) // is -0% because of template - does not affect styling
})

test('should have `nightLevel === 0` when percent >= 50', () => {
  const nightLevelTest = /rgba\(0, 20, 50, 0\)/

  let wrapper = shallow(<Sun {...props} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={75} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={100} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `nightLevel > 0 && nightLevel < 1` when percent is between 0 and 50', () => {
  const nightLevelTest = /rgba\(0, 20, 50, 0\.[\d]*\)/

  let wrapper = shallow(<Sun percent={45} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={25} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={1} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `nightLevel === 1` when percent === 0', () => {
  const nightLevelTest = /rgba\(0, 20, 50, 1\)/

  const wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `dayLevel === 0` when percent <= 50', () => {
  const dayLevelTest = /rgba\(135, 206, 235, 0\)/

  let wrapper = shallow(<Sun {...props} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  let testProps = { ...props, percent: 25 }
  wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  testProps = { ...props, percent: 0 }
  wrapper = shallow(<Sun {...props} />)
  expect(wrapper.html()).toMatch(dayLevelTest)
})

test('should have `dayLevel > 1` when percent >= 75', () => {
  const dayLevelTest = /rgba\(135, 206, 235, [12]+(\.\d)?\)/

  let testProps = { ...props, percent: 75 }
  let wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  testProps = { ...props, percent: 85 }
  wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  testProps = { ...props, percent: 100 }
  wrapper = shallow(<Sun {...testProps} />)
  expect(wrapper.html()).toMatch(dayLevelTest)
})
