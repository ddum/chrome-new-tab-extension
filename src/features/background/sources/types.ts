import type { Component } from 'vue'

import type { BackgroundSourceId } from '../model/types'

export interface BackgroundSource {
  id: BackgroundSourceId
  label: string
  // v-model — настройки источника, событие `apply(url)` — выбранная картинка
  component: Component
}
