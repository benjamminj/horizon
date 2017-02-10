import React from 'react'
import { shallow } from 'enzyme'

import Sun from './Sun'

const defaultWrapper = shallow(<Sun percent={50} />)

test('should render the component', () => {
  expect(defaultWrapper.is('.sun')).toBe(true)
})

test('should have `top: -100%` when percent is 50', () => {
  expect(defaultWrapper.html()).toMatch(/top:-100%/)
})

test('should have `top: -200%` when percent is 100', () => {
  const wrapper = shallow(<Sun percent={100} />)
  expect(wrapper.html()).toMatch(/top:-200%/)
})

test('should have `top: -0%` when percent is 0', () => {
  const wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).toMatch(/top:-0%/) // is -0% because of template - does not affect styling
})

test('should have `nightLevel === 0` when percent >= 50', () => {
  const nightLevelTest = /rgba\(0, 0, 0, 0\)/

  expect(defaultWrapper.html()).toMatch(nightLevelTest)

  let wrapper = shallow(<Sun percent={75} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={100} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `nightLevel > 0 && nightLevel < 1` when percent is between 0 and 30', () => {
  const nightLevelTest = /rgba\(0, 0, 0, 0\.[\d]*\)/

  let wrapper = shallow(<Sun percent={29} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={15} />)
  expect(wrapper.html()).toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={1} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `nightLevel === 1` when percent === 0', () => {
  const nightLevelTest = /rgba\(0, 0, 0, 1\)/

  const wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).toMatch(nightLevelTest)
})

test('should have `dayLevel === 0` when percent <= 50', () => {
  const dayLevelTest = /rgba\(135, 206, 235, 0\)/

  expect(defaultWrapper.html()).toMatch(dayLevelTest)

  let wrapper = shallow(<Sun percent={25} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).toMatch(dayLevelTest)
})

test('should have `dayLevel > 1` when percent >= 70', () => {
  const dayLevelTest = /rgba\(135, 206, 235, [1-3]+(\.\d*)?\)/

  let wrapper = shallow(<Sun percent={75} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  wrapper = shallow(<Sun percent={85} />)
  expect(wrapper.html()).toMatch(dayLevelTest)

  wrapper = shallow(<Sun percent={100} />)
  expect(wrapper.html()).toMatch(dayLevelTest)
})
