import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ButtonBase from '../ButtonBase.vue'

test('render ButtonBase', () => {
  const wrapper = mount(ButtonBase, {
    slots: {
      default: 'Button Text'
    }
  })

  expect(wrapper.find('button').text()).toContain('Button Text')
})
