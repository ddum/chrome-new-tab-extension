import { beforeEach, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'

import useStorage from '../useStorage'

interface TestValue {
  url: string
  tags: string[]
}

const codeTest = '__testLolaclStorage__'

beforeEach(() => {
  localStorage.clear()
})

it('useStorage - значение по умолчанию', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })
  expect(value.value).toStrictEqual({ url: 'test', tags: ['a', 'b'] })
})

it('useStorage - set', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })
  value.value = { url: 'test2', tags: ['c', 'd'] }

  const localStorageValue = JSON.parse(localStorage.getItem(codeTest) || '{}')
  expect(localStorageValue).toStrictEqual({ url: 'test2', tags: ['c', 'd'] })
})

it('useStorage - get', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })
  value.value = { url: 'test3', tags: ['c', 'd'] }
  expect(value.value).toStrictEqual({ url: 'test3', tags: ['c', 'd'] })
})

it('useStorage - частичная мутация', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })

  value.value.url = 'test4'
  value.value.tags.push('c')

  expect(value.value).toStrictEqual({ url: 'test4', tags: ['a', 'b', 'c'] })

  const localStorageValue = JSON.parse(localStorage.getItem(codeTest) || '{}')
  expect(localStorageValue).toStrictEqual({ url: 'test4', tags: ['a', 'b', 'c'] })
})

it('useStorage - изменение LocalStorage из другой вкладки', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })

  localStorage.setItem(codeTest, JSON.stringify({ url: 'test5', tags: ['c', 'd'] }))
  window.dispatchEvent(new StorageEvent('storage', { key: codeTest }))
  expect(value.value).toStrictEqual({ url: 'test5', tags: ['c', 'd'] })

  localStorage.removeItem(codeTest)
  window.dispatchEvent(new StorageEvent('storage', { key: codeTest }))
  expect(value.value).toStrictEqual({ url: 'test', tags: ['a', 'b'] })
})

it('useStorage - мутация не затрагивает значение по умолчанию', () => {
  const defaultValue: TestValue = { url: 'test', tags: ['a', 'b'] }
  const value = useStorage<TestValue>(codeTest, defaultValue)

  value.value.tags.push('c')
  expect(defaultValue.tags).toStrictEqual(['a', 'b'])
})

it('useStorage - повреждённое значение LocalStorage не прерывает инициализацию', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  localStorage.setItem(codeTest, '{invalid json')

  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })

  expect(value.value).toStrictEqual({ url: 'test', tags: ['a', 'b'] })
  expect(error).toHaveBeenCalledOnce()
  error.mockRestore()
})

it('useStorage - ошибка записи не прерывает мутацию значения', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
    throw new Error('Storage quota exceeded')
  })
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })

  value.value.url = 'test6'

  expect(value.value.url).toBe('test6')
  expect(error).toHaveBeenCalledOnce()
  setItem.mockRestore()
  error.mockRestore()
})

it('useStorage - перестаёт слушать storage после dispose', () => {
  const scope = effectScope()
  const value = scope.run(() => useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] }))!

  scope.stop()

  localStorage.setItem(codeTest, JSON.stringify({ url: 'test7', tags: ['e', 'f'] }))
  window.dispatchEvent(new StorageEvent('storage', { key: codeTest }))

  expect(value.value).toStrictEqual({ url: 'test', tags: ['a', 'b'] })
})
