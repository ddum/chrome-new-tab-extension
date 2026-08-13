export interface BackgroundValue {
  url: string
  tags: string[]
  accessKey: string
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

export const STORAGE_DEFAULT_VALUE: AppValue = {
  background: {
    url: '',
    tags: [],
    accessKey: '',
  },
  links: {
    items: [],
  },
}
