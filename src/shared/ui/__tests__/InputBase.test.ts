import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import InputBase from '../InputBase.vue'

it('рендер InputBase', () => {
  const wrapper = mount(InputBase, {
    props: {
      modelValue: 'Input Text',
      placeholder: 'Placeholder Text',
    },
  })

  const input = wrapper.find<HTMLInputElement>('.input')
  expect(input.attributes('placeholder')).toBe('Placeholder Text')
  expect(input.element.value).toBe('Input Text')
})

it('inputBase ввод текста', async () => {
  const wrapper = mount(InputBase)
  const input = wrapper.find<HTMLInputElement>('.input')

  await input.setValue('Test Text')
  expect(input.element.value).toBe('Test Text')

  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
})
