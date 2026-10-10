import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { useBackgroundStore } from '@/features/background/model/store'
import { unsplashSource } from '@/features/background/sources/unsplash'

import { SettingsBackground } from '..'

const SettingsUnsplash = unsplashSource.component

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
})

it('settingsBackground рендерит активный источник с его настройками', () => {
  const wrapper = mount(SettingsBackground)

  expect(wrapper.getComponent(SettingsUnsplash).props('modelValue')).toEqual({ tags: [], accessKey: '' })
})

it('settingsBackground передаёт источнику обновлённые настройки из стора', async () => {
  const wrapper = mount(SettingsBackground)

  useBackgroundStore().setSourceSettings('unsplash', { tags: ['test'], accessKey: 'key' })

  await nextTick()
  expect(wrapper.getComponent(SettingsUnsplash).props('modelValue')).toEqual({
    tags: ['test'],
    accessKey: 'key',
  })
})

it('settingsBackground сохраняет настройки источника', async () => {
  const wrapper = mount(SettingsBackground)

  await wrapper.getComponent(SettingsUnsplash).vm.$emit('update:modelValue', {
    tags: ['a'],
    accessKey: 'test-access-key',
  })

  expect(useBackgroundStore().sources.unsplash).toEqual({ tags: ['a'], accessKey: 'test-access-key' })
})

it('settingsBackground записывает url из apply в стор', async () => {
  const wrapper = mount(SettingsBackground)

  await wrapper.getComponent(SettingsUnsplash).vm.$emit('apply', 'https://example.com/photo')

  expect(useBackgroundStore().url).toBe('https://example.com/photo')
})
