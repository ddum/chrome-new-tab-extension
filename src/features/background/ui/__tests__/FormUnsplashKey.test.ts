import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import FormUnsplashKey from '../FormUnsplashKey.vue'

it('formUnsplashKey рендер поля ввода', () => {
  const wrapper = mount(FormUnsplashKey, {
    props: { modelValue: '' },
  })

  const input = wrapper.findComponent({ name: 'InputBase' })
  expect(input.exists()).toBe(true)
  expect(input.props().type).toBe('password')

  expect(wrapper.find('button').exists()).toBe(false)
})

it('formUnsplashKey сохраняет ключ при вводе', async () => {
  const wrapper = mount(FormUnsplashKey, {
    props: { modelValue: '' },
  })

  const input = wrapper.findComponent({ name: 'InputBase' })

  await input.setValue('test-access-key')

  expect(wrapper.emitted('update:modelValue')).toEqual([['test-access-key']])
})

it('formUnsplashKey сохраняет пустую строку при очистке', async () => {
  const wrapper = mount(FormUnsplashKey, {
    props: { modelValue: 'test-access-key' },
  })

  const input = wrapper.findComponent({ name: 'InputBase' })

  await input.setValue('')

  expect(wrapper.emitted('update:modelValue')).toEqual([['']])
})
