export interface UnsplashSettings {
  tags: string[]
  accessKey: string
}

export const UNSPLASH_DEFAULT_SETTINGS: UnsplashSettings = {
  tags: [],
  accessKey: '',
}
