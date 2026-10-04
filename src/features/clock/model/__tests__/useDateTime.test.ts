import type { EffectScope } from 'vue'

import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'

import useDateTime from '../useDateTime'

const date = new Date(1988, 9, 3, 1, 2, 3)
let scope: EffectScope

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(date)
  scope = effectScope()
})

afterEach(() => {
  scope.stop()
  vi.useRealTimers()
})

function setupDateTime() {
  return scope.run(() => useDateTime())!
}

it('now соответствует системному времени', () => {
  const { now } = setupDateTime()
  expect(now.value.valueOf()).toBe(date.valueOf())
})

it('форматирует timeString', () => {
  const { timeString } = setupDateTime()
  expect(timeString.value).toBe('01:02')
})

it('форматирует dateString', () => {
  const { dateString } = setupDateTime()
  expect(dateString.value).toBe('понедельник, 3 октября 1988 г.')
})

it('обновляет timeString', () => {
  const { timeString } = setupDateTime()
  vi.advanceTimersByTime(1000 * 60)
  expect(timeString.value).toBe('01:03')
})

it('обновляет dateString', () => {
  const { dateString } = setupDateTime()
  vi.advanceTimersByTime(1000 * 60 * 60 * 24)
  expect(dateString.value).toBe('вторник, 4 октября 1988 г.')
})

it('перестаёт обновляться после dispose владельца', () => {
  const { timeString } = setupDateTime()
  const frozen = timeString.value

  scope.stop()
  vi.setSystemTime(new Date(2000, 0, 1, 12, 0, 0))
  vi.advanceTimersByTime(1000 * 10)

  expect(timeString.value).toBe(frozen)
})
