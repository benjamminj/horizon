import React from 'react'
import { shallow } from 'enzyme'
import Clock from './Clock'

const props = {
  remaining: (1000 * 60 * 60 * 5) + (1000 * 60 * 25) + (1000 * 43), // hh:mm:ss -- 05:25:43
  name: 'sunrise',
  waiting: true
}

test('should render component', () => {
  const wrapper = shallow(<Clock {...props} />)
  expect(wrapper.is('.time-display')).toBe(true)
})

test('should render time when waiting', () => {
  const wrapper = shallow(<Clock {...props} />)
  expect(wrapper.find('h1').length).toBe(1)
})

test('should not render time when not waiting', () => {
  const propsNotWaiting = { ...props, waiting: false }
  const wrapper = shallow(<Clock {...propsNotWaiting} />)
  expect(wrapper.find('h1').length).toBe(0)
})

test('should render "Time until sunrise" when waiting', () => {
  const wrapper = shallow(<Clock {...props} />)
  expect(wrapper.find('h6').text()).toEqual('Time until sunrise:')
})

test('should render "sunrise is happening right now!" when not waiting', () => {
  const propsNotWaiting = { ...props, waiting: false }
  const wrapper = shallow(<Clock {...propsNotWaiting} />)
  expect(wrapper.find('h6').text()).toEqual('sunrise is happening right now!')
})

test('should display time remaining as hh:mm:ss', () => {
  const wrapper = shallow(<Clock {...props} />)
  expect(wrapper.find('h1').text()).toEqual('05:25:43')
})

