export interface LinkItem {
  url: string
  title: string
}

export interface LinksValue {
  items: LinkItem[]
}

declare module '@/shared/model/app-snapshot/types' {
  interface AppValue {
    links: LinksValue
  }
}
