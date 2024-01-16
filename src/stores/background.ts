import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Background {
  url: string
}

const loacalStorageKey = 'background'

function get(): Background {
  const localStorageValue = localStorage.getItem(loacalStorageKey)
  if (localStorageValue) {
    return JSON.parse(localStorageValue)
  } else {
    return {
      url: ''
    }
  }
}

function save(file: Background): void {
  localStorage.setItem(loacalStorageKey, JSON.stringify(file))
}

export const useBackgroundStore = defineStore('background', () => {
  const background = ref(get())

  function set(value: Background) {
    background.value = value
    save(value)
  }

  const backgroundUrl = computed(() => background.value.url)

  return { backgroundUrl, set }
})
