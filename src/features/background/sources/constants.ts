import type { BackgroundSourceId } from '../model/types'
import type { BackgroundSource } from './types'

import { unsplashSource } from './unsplash'

export const BACKGROUND_SOURCES: Record<BackgroundSourceId, BackgroundSource> = {
  unsplash: unsplashSource,
}
