import { beforeEach, expect } from 'vitest'

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

it('useStorage - изменение LocalStorage напрямую', () => {
  const value = useStorage<TestValue>(codeTest, { url: 'test', tags: ['a', 'b'] })

  localStorage.setItem(codeTest, JSON.stringify({ url: 'test4', tags: ['c', 'd'] }))
  expect(value.value).toStrictEqual({ url: 'test4', tags: ['c', 'd'] })

  localStorage.removeItem(codeTest)
  expect(value.value).toStrictEqual({ url: 'test', tags: ['a', 'b'] })
})
