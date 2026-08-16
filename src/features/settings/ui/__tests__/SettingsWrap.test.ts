import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import SettingsWrap from '../SettingsWrap.vue'

function mountWrap() {
  return mount(SettingsWrap, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
      stubs: {
        SettingsBackground: {
          template: '<div>background-panel</div>',
        },
        SettingsLinks: {
          template: '<div>links-panel</div>',
        },
      },
    },
  })
}

it('settingsWrap по умолчанию показывает вкладку фона', () => {
  const wrapper = mountWrap()

  expect(wrapper.text()).toContain('Фон')
  expect(wrapper.text()).toContain('Ссылки')
  expect(wrapper.text()).toContain('background-panel')
  expect(wrapper.text()).not.toContain('links-panel')
})

it('settingsWrap переключает вкладку на ссылки', async () => {
  const wrapper = mountWrap()

  const linksTab = wrapper.findAll('button').find(button => button.text() === 'Ссылки')
  await linksTab!.trigger('mousedown', { button: 0 })

  expect(wrapper.text()).toContain('links-panel')
  expect(wrapper.text()).not.toContain('background-panel')
})
