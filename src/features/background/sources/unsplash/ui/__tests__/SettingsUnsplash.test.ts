import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

import RefreshUnsplashButton from '../RefreshUnsplashButton.vue'
import SettingsUnsplash from '../SettingsUnsplash.vue'
import UnsplashAccessKeyField from '../UnsplashAccessKeyField.vue'
import UnsplashTagsField from '../UnsplashTagsField.vue'

const settings = { tags: ['nature'], accessKey: 'test-access-key' }

it('передаёт настройки в поля', () => {
  const wrapper = mount(SettingsUnsplash, {
    props: { modelValue: settings },
  })

  expect(wrapper.getComponent(UnsplashAccessKeyField).props('modelValue')).toBe('test-access-key')
  expect(wrapper.getComponent(UnsplashTagsField).props('modelValue')).toEqual(['nature'])
  expect(wrapper.getComponent(RefreshUnsplashButton).props()).toEqual({
    accessKey: 'test-access-key',
    tags: ['nature'],
  })
})

it('обновляет ключ, не теряя теги', async () => {
  const wrapper = mount(SettingsUnsplash, {
    props: { modelValue: settings },
  })

  await wrapper.getComponent(UnsplashAccessKeyField).vm.$emit('update:modelValue', 'new-key')

  expect(wrapper.emitted('update:modelValue')).toEqual([[{ tags: ['nature'], accessKey: 'new-key' }]])
})

it('обновляет теги, не теряя ключ', async () => {
  const wrapper = mount(SettingsUnsplash, {
    props: { modelValue: settings },
  })

  await wrapper.getComponent(UnsplashTagsField).vm.$emit('update:modelValue', ['nature', 'ocean'])

  expect(wrapper.emitted('update:modelValue')).toEqual([
    [{ tags: ['nature', 'ocean'], accessKey: 'test-access-key' }],
  ])
})

it('пробрасывает apply', async () => {
  const wrapper = mount(SettingsUnsplash, {
    props: { modelValue: settings },
  })

  await wrapper.getComponent(RefreshUnsplashButton).vm.$emit('apply', 'https://example.com/photo')

  expect(wrapper.emitted('apply')).toEqual([['https://example.com/photo']])
})
