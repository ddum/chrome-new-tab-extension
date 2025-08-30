import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import InputBase from '../InputBase.vue'

it('render InputBase', () => {
  const wrapper = mount(InputBase, {
    props: {
      modelValue: 'Input Text',
      placeholder: 'Placeholder Text',
    },
  })

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<input data-v-56868875="" type="text" class="input" placeholder="Placeholder Text">"`,
  )

  const input = wrapper.find<HTMLInputElement>('.input')
  expect(input.element.value).toBe('Input Text')
})

it('inputBase ввод текста', async () => {
  const wrapper = mount(InputBase)
  const input = wrapper.find<HTMLInputElement>('.input')

  await input.setValue('Test Text')
  expect(input.element.value).toBe('Test Text')

  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
})
