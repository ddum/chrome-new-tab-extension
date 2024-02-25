import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import FormAddLink from '../FormAddLink.vue'

test('FormAddLink рендер формы', async () => {
  const wrapper = mount(FormAddLink)

  const form = wrapper.find<HTMLInputElement>('.form')
  expect(form.exists()).toBe(true)

  const inputComponents = wrapper.findAllComponents({ name: 'InputBase' })
  expect(inputComponents).toHaveLength(2)

  const button = wrapper.findComponent({ name: 'ButtonBase' })
  expect(button.exists()).toBe(true)
  expect(button.props().type).toBe('submit')
})

test('FormAddLink события на форме', async () => {
  const wrapper = mount(FormAddLink)

  const form = wrapper.find<HTMLInputElement>('.form')

  const inputLink = wrapper.find<HTMLInputElement>('.link')
  await inputLink.setValue('link')

  const inputTitle = wrapper.find<HTMLInputElement>('.title')
  await inputTitle.setValue('title')

  await form.trigger('submit')
  expect(wrapper.emitted()).toHaveProperty('submit')
  expect(wrapper.emitted('submit')).toEqual([['link', 'title']])
})
