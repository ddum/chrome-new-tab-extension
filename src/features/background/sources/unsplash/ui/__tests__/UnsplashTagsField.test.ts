import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

import UnsplashTagsField from '../UnsplashTagsField.vue'

it('рендерит поле ввода тегов', () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: [] },
  })

  const input = wrapper.get('input')
  expect(input.attributes('placeholder')).toBe('Тег изображения')
  expect(wrapper.find('button').exists()).toBe(false)
})

it('показывает существующие теги', () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: ['nature', 'ocean'] },
  })

  expect(wrapper.text()).toContain('nature')
  expect(wrapper.text()).toContain('ocean')
  expect(wrapper.findAll('button')).toHaveLength(2)
})

it('добавляет тег по Enter', async () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: [] },
  })

  const input = wrapper.get('input')
  await input.setValue('nature')
  await input.trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toEqual([[['nature']]])
})

it('не добавляет пустой тег', async () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: [] },
  })

  await wrapper.get('input').trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('не добавляет дублирующийся тег', async () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: ['nature'] },
  })

  const input = wrapper.get('input')
  await input.setValue('nature')
  await input.trigger('keydown.enter')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('удаляет тег', async () => {
  const wrapper = mount(UnsplashTagsField, {
    props: { modelValue: ['nature'] },
  })

  await wrapper.get('button').trigger('click')

  expect(wrapper.emitted('update:modelValue')).toEqual([[[]]])
})
