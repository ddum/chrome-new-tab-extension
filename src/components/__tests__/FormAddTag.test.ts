import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormAddTag from '../FormAddTag.vue'

it('formAddTag рендер формы', async () => {
  const wrapper = mount(FormAddTag)

  const form = wrapper.find<HTMLInputElement>('.form')
  expect(form.exists()).toBe(true)

  const input = wrapper.findComponent({ name: 'InputBase' })
  expect(input.exists()).toBe(true)

  const button = wrapper.findComponent({ name: 'ButtonBase' })
  expect(button.exists()).toBe(true)
  expect(button.props().type).toBe('submit')
})

it('formAddTag события на форме', async () => {
  const wrapper = mount(FormAddTag)

  const form = wrapper.find<HTMLInputElement>('.form')
  const input = wrapper.findComponent({ name: 'InputBase' })

  await input.setValue('testTag')
  await form.trigger('submit')

  expect(wrapper.emitted()).toHaveProperty('submit')
  expect(wrapper.emitted('submit')).toEqual([['testTag']])
})
