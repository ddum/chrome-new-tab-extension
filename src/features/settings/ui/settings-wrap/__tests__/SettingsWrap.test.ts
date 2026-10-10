import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

import type { SettingsTab } from '@/features/settings/model/types'

import { provideSettingsTabs } from '@/features/settings/model/useSettingsTabs'

import { SettingsWrap } from '..'

const tabs: SettingsTab[] = [
  {
    code: 'background',
    title: 'Фон',
    component: { template: '<div>background-panel</div>' },
  },
  {
    code: 'links',
    title: 'Ссылки',
    component: { template: '<div>links-panel</div>' },
  },
]

function mountWrap() {
  return mount(defineComponent({
    components: { SettingsWrap },
    setup() {
      provideSettingsTabs(tabs)
    },
    template: '<SettingsWrap />',
  }), {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  })
}

it('settingsWrap по умолчанию показывает вкладку фона', () => {
  const wrapper = mountWrap()

  expect(wrapper.text()).toContain('Фон')
  expect(wrapper.text()).toContain('Ссылки')
  expect(wrapper.text()).toContain('background-panel')
  expect(wrapper.text()).not.toContain('links-panel')
  expect(wrapper.text()).toContain('Импорт')
  expect(wrapper.text()).toContain('Экспорт')
})

it('settingsWrap переключает вкладку на ссылки', async () => {
  const wrapper = mountWrap()

  const linksTab = wrapper.findAll('button').find(button => button.text() === 'Ссылки')
  await linksTab!.trigger('click')

  expect(wrapper.text()).toContain('links-panel')
  expect(wrapper.text()).not.toContain('background-panel')
})
