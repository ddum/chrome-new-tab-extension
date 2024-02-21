import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TagBase from '../TagBase.vue'

test('render TagBase', async () => {
  const wrapper = mount(TagBase, {
    slots: {
      default: 'Tag Text'
    }
  })

  expect(wrapper.text()).toBe('Tag Text')

  await wrapper.setProps({ deleteButton: true })
  expect(wrapper.find('.tag__button').exists()).toBe(true)
})

test('TagBase событие delete', () => {
  const wrapper = mount(TagBase)
  wrapper.find('.tag__button').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('delete')
})
