import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormAddTag from '../FormAddTag.vue'

it('formAddTag рендер формы', async () => {
  const wrapper = mount(FormAddTag)

  const form = wrapper.find<HTMLInputElement>('.form')
  expect(form.exists()).toBe(true)

  const input = wrapper.findComponent({ name: 'InputBase' })
  expect(input.exists()).toBe(true)

  const button = wrapper.get('button')
  expect(button.text()).toBe('Добавить')
  expect(button.attributes('type')).toBe('submit')
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
