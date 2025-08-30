import { computed, ref } from 'vue'

export default function useDateTime() {
  const now = ref(new Date())

  setInterval(() => (now.value = new Date()), 1000 * 10)

  const timeString = computed(() => {
    const hours = now.value.getHours()
    const minutes = now.value.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  })

  const dateString = computed(() => {
    return now.value.toLocaleDateString('ru-RU', {
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
