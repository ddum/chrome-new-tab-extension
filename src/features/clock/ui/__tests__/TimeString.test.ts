import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TimeString from '../TimeString.vue'

it('timeString - рендер', async () => {
  const wrapper = mount(TimeString)
  expect(wrapper.find('.time').exists()).toBe(true)
  expect(wrapper.find('.date').exists()).toBe(true)
})
