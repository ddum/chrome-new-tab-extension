import { afterAll, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'

import useDateTime from '../useDateTime'

vi.useFakeTimers()

const date = new Date(1988, 9, 3, 1, 2, 3)
vi.setSystemTime(date)

const scope = effectScope()
const { now, timeString, dateString } = scope.run(() => useDateTime())!

afterAll(() => {
  scope.stop()
})

it('now соответствует системному времени', () => {
  expect(now.value.valueOf()).toBe(date.valueOf())
})
it('форматирует timeString', () => {
  expect(timeString.value).toBe('01:02')
})
it('форматирует dateString', () => {
  expect(dateString.value).toBe('понедельник, 3 октября 1988 г.')
})

it('обновляет timeString', () => {
  vi.advanceTimersByTime(1000 * 60 * 1)
  expect(timeString.value).toBe('01:03')
})

it('обновляет dateString', () => {
  vi.advanceTimersByTime(1000 * 60 * 60 * 24)
  expect(dateString.value).toBe('вторник, 4 октября 1988 г.')
})

it('перестаёт обновляться после dispose владельца', () => {
  const isolatedScope = effectScope()
  const { timeString: scopedTime } = isolatedScope.run(() => useDateTime())!

  isolatedScope.stop()

  const frozen = scopedTime.value
  vi.setSystemTime(new Date(2000, 0, 1, 12, 0, 0))
  vi.advanceTimersByTime(1000 * 10)

  expect(scopedTime.value).toBe(frozen)
})
