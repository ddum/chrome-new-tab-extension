import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import ButtonIcon from '../ButtonIcon.vue'

it('рендер ButtonIcon', async () => {
  const wrapper = mount(ButtonIcon, {
    slots: {
      default: 'Button Text',
    },
  })

  expect(wrapper.get('button').text()).toBe('Button Text')
  expect(wrapper.get('button').classes()).toContain('button_rotate_hover')

  await wrapper.setProps({ rotateHover: false, rotate: true })
  expect(wrapper.get('button').classes()).toContain('button_rotate')
  expect(wrapper.get('button').classes()).not.toContain('button_rotate_hover')
})
