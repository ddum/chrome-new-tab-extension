export interface CategoryItem {
  title: string
  code: string
}

export interface BackgroundValue {
  url: string
  tags: string[]
}

export interface LinkItem {
  url: string
  title: string
}
export interface LinksValue {
  items: LinkItem[]
}

export interface AppValue {
  background: BackgroundValue
  links: LinksValue
}
