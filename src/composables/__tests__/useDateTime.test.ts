import { test, expect, vi } from 'vitest'
import useDateTime from '../useDateTime'

vi.useFakeTimers()

const date = new Date(1988, 9, 3, 1, 2, 3)
vi.setSystemTime(date)

const { now, timeString, dateString } = useDateTime()

test('test now', () => {
  expect(now.value.valueOf()).toBe(date.valueOf())
})
test('test timeString', () => {
  expect(timeString.value).toBe('01:02')
})
test('test dateString', () => {
  expect(dateString.value).toBe('понедельник, 3 октября 1988 г.')
})

test('test изменения timeString', () => {
  vi.advanceTimersByTime(1000 * 60 * 1)
  expect(timeString.value).toBe('01:03')
})

test('test изменения dateString', () => {
  vi.advanceTimersByTime(1000 * 60 * 60 * 24)
  expect(dateString.value).toBe('вторник, 4 октября 1988 г.')
})
