import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'
import ClockContainer from '../containers/ClockContainer'
import SunContainer from '../containers/SunContainer'

test('should render without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.is('#app')).toBe(true)
})

test('should render Clock and Sun container if `loaded === true`', () => {
  const wrapper = shallow(<App loaded />)
  expect(wrapper.contains(<ClockContainer />)).toBe(true)
  expect(wrapper.contains(<SunContainer />)).toBe(true)
})

test('should have `skyblue` background if `loaded === true`', () => {
  const wrapper = shallow(<App loaded />)
  const { background } = wrapper.props().style
  expect(background).toMatch(/skyblue/)
})

test('should have overlay background if `loaded === false`', () => {
  const wrapper = shallow(<App />)
  const { background } = wrapper.props().style
  expect(background).toMatch(/rgba/)
})

test('should not render Clock/Sun containers if `loaded === false`', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.contains(<ClockContainer />)).toBe(false)
  expect(wrapper.contains(<SunContainer />)).toBe(false)
})

test('should call onAppLoad when the component is mounted', () => {
  const onAppLoad = jest.fn(() => {
    return () => {console.log('foo')}
  })
  const wrapper = mount(<App onAppLoad={onAppLoad} />)
  expect(onAppLoad.mock.calls).toHaveLength(1)
})
