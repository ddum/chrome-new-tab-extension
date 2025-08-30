import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TagBase from '../TagBase.vue'

it('render TagBase', async () => {
  const wrapper = mount(TagBase, {
    slots: {
      default: 'Tag Text',
    },
  })

  expect(wrapper.text()).toBe('Tag Text')

  await wrapper.setProps({ deleteButton: true })
  expect(wrapper.find('.tag__button').exists()).toBe(true)
})

it('tagBase событие delete', () => {
  const wrapper = mount(TagBase)
  wrapper.find('.tag__button').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('delete')
})
