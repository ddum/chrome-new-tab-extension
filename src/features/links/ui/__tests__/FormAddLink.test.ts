import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormAddLink from '../FormAddLink.vue'

it('formAddLink рендер формы', async () => {
  const wrapper = mount(FormAddLink)

  const form = wrapper.find('form')
  expect(form.exists()).toBe(true)

  const inputs = wrapper.findAll('input')
  expect(inputs).toHaveLength(2)

  const button = wrapper.get('button')
  expect(button.text()).toBe('Добавить')
  expect(button.attributes('type')).toBe('submit')
})

it('formAddLink события на форме', async () => {
  const wrapper = mount(FormAddLink)

  const form = wrapper.find('form')

  const inputLink = wrapper.get<HTMLInputElement>('#add-link-url')
  await inputLink.setValue('link')

  const inputTitle = wrapper.get<HTMLInputElement>('#add-link-title')
  await inputTitle.setValue('title')

  await form.trigger('submit')
  expect(wrapper.emitted()).toHaveProperty('submit')
  expect(wrapper.emitted('submit')).toEqual([['link', 'title']])
})
