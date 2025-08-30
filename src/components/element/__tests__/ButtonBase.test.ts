import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import ButtonBase from '../ButtonBase.vue'

it('render ButtonBase', () => {
  const wrapper = mount(ButtonBase, {
    slots: {
      default: 'Button Text',
    },
  })

  expect(wrapper.find('button').text()).toContain('Button Text')
})
