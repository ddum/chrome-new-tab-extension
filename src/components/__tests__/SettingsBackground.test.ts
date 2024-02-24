import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'

import SettingsBackground from '../SettingsBackground.vue'
import { useAppStore } from '../../stores'

test('render пустой SettingsBackground', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsBackground)

  const appStore = useAppStore()
  appStore.addTag('test')
  appStore.addTag('test2')

  await nextTick()
  expect(wrapper.findComponent({ name: 'FormAddTag' }).exists()).toBe(true)
  expect(wrapper.findAllComponents({ name: 'TagBase' })).toHaveLength(2)
})
