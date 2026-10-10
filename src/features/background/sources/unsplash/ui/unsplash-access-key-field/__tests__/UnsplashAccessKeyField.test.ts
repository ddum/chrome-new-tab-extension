import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

import { UnsplashAccessKeyField } from '..'

it('рендерит поле ввода ключа', () => {
  const wrapper = mount(UnsplashAccessKeyField, {
    props: { modelValue: '' },
  })

  const input = wrapper.get('input')
  expect(input.attributes('type')).toBe('password')
  expect(wrapper.find('button').exists()).toBe(false)
})

it('не сохраняет ключ при вводе', async () => {
  const wrapper = mount(UnsplashAccessKeyField, {
    props: { modelValue: '' },
  })

  await wrapper.get('input').setValue('test-access-key')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  expect((wrapper.get('input').element as HTMLInputElement).value).toBe('test-access-key')
})

it('сохраняет ключ при потере фокуса', async () => {
  const wrapper = mount(UnsplashAccessKeyField, {
    props: { modelValue: '' },
  })

  await wrapper.get('input').setValue('test-access-key')
  await wrapper.get('input').trigger('blur')

  expect(wrapper.emitted('update:modelValue')).toEqual([['test-access-key']])
})

it('сохраняет пустую строку при очистке и потере фокуса', async () => {
  const wrapper = mount(UnsplashAccessKeyField, {
    props: { modelValue: 'test-access-key' },
  })

  await wrapper.get('input').setValue('')
  await wrapper.get('input').trigger('blur')

  expect(wrapper.emitted('update:modelValue')).toEqual([['']])
})
