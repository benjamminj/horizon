import React from 'react'
import { shallow } from 'enzyme'

import Sun from './Sun'

const defaultWrapper = shallow(<Sun percent={50} />)

test('should render the component', () => {
  expect(defaultWrapper.is('.sky')).toBe(true)
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

test('should not render `night` div if percent >= 40', () => {
  const nightLevelTest = /div class="night"/

  expect(defaultWrapper.html()).not.toMatch(nightLevelTest)

  let wrapper = shallow(<Sun percent={75} />)
  expect(wrapper.html()).not.toMatch(nightLevelTest)

  wrapper = shallow(<Sun percent={100} />)
  expect(wrapper.html()).not.toMatch(nightLevelTest)
})

test('should have `nightLevel > 0 && nightLevel < 1` when percent is between 10 and 40', () => {
  const nightTest = /div class="night"/
  const opacityTest = /opacity:0\.[\d]*/

  let wrapper = shallow(<Sun percent={29} />)
  expect(wrapper.html()).toMatch(nightTest)
  expect(wrapper.html()).toMatch(opacityTest)

  wrapper = shallow(<Sun percent={15} />)
  expect(wrapper.html()).toMatch(nightTest)
  expect(wrapper.html()).toMatch(opacityTest)

  wrapper = shallow(<Sun percent={35} />)
  expect(wrapper.html()).toMatch(nightTest)
  expect(wrapper.html()).toMatch(opacityTest)
})

test('should have `nightLevel > 1` when percent < 10', () => {
  const opacityTest = /opacity:1\.[\d]*/

  const wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).toMatch(opacityTest)
})

test('should not render `day` div when percent <= 50', () => {
  const dayLevelTest = /div class="day"/

  expect(defaultWrapper.html()).not.toMatch(dayLevelTest)

  let wrapper = shallow(<Sun percent={25} />)
  expect(wrapper.html()).not.toMatch(dayLevelTest)

  wrapper = shallow(<Sun percent={0} />)
  expect(wrapper.html()).not.toMatch(dayLevelTest)
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
