import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TimeString from '../TimeString.vue'

it('timeString - рендер', () => {
  const wrapper = mount(TimeString)
  expect(wrapper.text()).toMatch(/\d{2}:\d{2}/)
})
