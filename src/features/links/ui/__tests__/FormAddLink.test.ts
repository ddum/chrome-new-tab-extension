import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormAddLink from '../FormAddLink.vue'

it('formAddLink рендер формы', async () => {
  const wrapper = mount(FormAddLink)

  const form = wrapper.find<HTMLInputElement>('.form')
  expect(form.exists()).toBe(true)

  const inputComponents = wrapper.findAllComponents({ name: 'InputBase' })
  expect(inputComponents).toHaveLength(2)

  const button = wrapper.get('button')
  expect(button.text()).toBe('Добавить')
  expect(button.attributes('type')).toBe('submit')
})

it('formAddLink события на форме', async () => {
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
