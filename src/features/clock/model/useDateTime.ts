import { computed, getCurrentScope, onScopeDispose, ref } from 'vue'

import { DATE_LOCALE } from '@/shared/config/app'

export default function useDateTime() {
  const now = ref(new Date())

  const intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000 * 10)

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearInterval(intervalId)
    })
  }

  const timeString = computed(() => {
    const hours = now.value.getHours()
    const minutes = now.value.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
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
