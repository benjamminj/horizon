import React from 'react'
import { shallow } from 'enzyme'

import Footer from './Footer'

const wrapper = shallow(<Footer />)

test('should render the component', () => {
  expect(wrapper.is('footer')).toBe(true)
})
