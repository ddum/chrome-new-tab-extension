import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TimeString from '../TimeString.vue'

test('TimeString - render', async () => {
  const wrapper = mount(TimeString)
  expect(wrapper.find('.time').exists()).toBe(true)
  expect(wrapper.find('.date').exists()).toBe(true)
})
