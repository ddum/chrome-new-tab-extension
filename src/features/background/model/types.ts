import type { UnsplashSettings } from '../sources/unsplash'

export interface BackgroundSourceSettings {
  unsplash: UnsplashSettings
}

export type BackgroundSourceId = keyof BackgroundSourceSettings

export interface BackgroundValue {
  url: string
  source: BackgroundSourceId
  sources: BackgroundSourceSettings
}

declare module '@/shared/model/app-snapshot/types' {
  interface AppValue {
    background: BackgroundValue
  }
}
