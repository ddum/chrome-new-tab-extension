export function get<T>(loacalStorageKey: string, defaultValue: T): T {
  const localStorageValue = localStorage.getItem(loacalStorageKey)
  if (localStorageValue) {
    return JSON.parse(localStorageValue)
  } else {
    return defaultValue
  }
}

export function save(value: any, loacalStorageKey: string): void {
  localStorage.setItem(loacalStorageKey, JSON.stringify(value))
}
