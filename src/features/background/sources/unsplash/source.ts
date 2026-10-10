import type { BackgroundSource } from '../types'

import { SettingsUnsplash } from './ui/settings-unsplash'

export const unsplashSource: BackgroundSource = {
  id: 'unsplash',
  label: 'Unsplash',
  component: SettingsUnsplash,
}
