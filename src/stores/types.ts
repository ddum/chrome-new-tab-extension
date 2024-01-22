export interface CategoryItem {
  title: string
  code: string
}

export interface BackgroundValue {
  url: string
  tags: string[]
}

export interface AppValue {
  background: BackgroundValue
}
