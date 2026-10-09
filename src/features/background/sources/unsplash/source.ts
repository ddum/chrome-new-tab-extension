import type { BackgroundSource } from '../types'

import SettingsUnsplash from './ui/SettingsUnsplash.vue'

export const unsplashSource: BackgroundSource = {
  id: 'unsplash',
  label: 'Unsplash',
  component: SettingsUnsplash,
}
