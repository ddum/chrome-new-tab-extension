import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormAddTag from '../FormAddTag.vue'

it('formAddTag рендер поля ввода тегов', () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: [] },
  })

  const input = wrapper.get('input')
  expect(input.attributes('placeholder')).toBe('Тег изображения')
  expect(wrapper.find('button').exists()).toBe(false)
})

it('formAddTag показывает существующие теги', () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: ['nature', 'ocean'] },
  })

  expect(wrapper.text()).toContain('nature')
  expect(wrapper.text()).toContain('ocean')
  expect(wrapper.findAll('button')).toHaveLength(2)
})

it('formAddTag добавляет тег по Enter', async () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: [] },
  })

  const input = wrapper.get('input')
  await input.setValue('nature')
  await input.trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toEqual([[['nature']]])
})

it('formAddTag не добавляет пустой тег', async () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: [] },
  })

  await wrapper.get('input').trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('formAddTag не добавляет дублирующийся тег', async () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: ['nature'] },
  })

  const input = wrapper.get('input')
  await input.setValue('nature')
  await input.trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('formAddTag удаляет тег', async () => {
  const wrapper = mount(FormAddTag, {
    props: { modelValue: ['nature'] },
  })

  await wrapper.get('button').trigger('click')

  expect(wrapper.emitted('update:modelValue')).toEqual([[[]]])
})
