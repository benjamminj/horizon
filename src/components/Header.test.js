import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

test('renders without crashing', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper.find('header')).toBeDefined
})
