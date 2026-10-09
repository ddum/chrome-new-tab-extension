import type { SettingsTab } from '@/features/settings/model/types'

import { backgroundSettingsTab } from '@/features/background/settings-tab'
import { linksSettingsTab } from '@/features/links/settings-tab'

export const SETTINGS_TABS: readonly SettingsTab[] = [
  backgroundSettingsTab,
  linksSettingsTab,
]
