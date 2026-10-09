import { computed, getCurrentScope, onScopeDispose, ref } from 'vue'

import { DATE_LOCALE } from '@/shared/config/app'

const MINUTE_MS = 60 * 1000

function msUntilNextMinute(date: Date) {
  return MINUTE_MS - (date.getSeconds() * 1000 + date.getMilliseconds())
}

export function useDateTime() {
  const now = ref(new Date())

  let intervalId: ReturnType<typeof setInterval> | undefined

  const timeoutId = setTimeout(() => {
    now.value = new Date()
    intervalId = setInterval(() => {
      now.value = new Date()
    }, MINUTE_MS)
  }, msUntilNextMinute(now.value))

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearTimeout(timeoutId)
      if (intervalId !== undefined) {
        clearInterval(intervalId)
      }
    })
  }

  const timeString = computed(() => {
    return now.value.toLocaleTimeString(DATE_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  const dateString = computed(() => {
    return now.value.toLocaleDateString(DATE_LOCALE, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  return {
    now,
    timeString,
    dateString,
  }
}
