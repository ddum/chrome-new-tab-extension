import { ref } from 'vue'

interface options {
  tags?: string[]
}

export function useBackground() {
  const imgUrl = ref('')
  const isLoading = ref(false)

  async function random(options: options = {}): Promise<void> {
    isLoading.value = true
    let urlImage = `https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/`

    if (options.tags) {
      urlImage += `?${options.tags.join(',')}`
    }

    const response = await fetch(urlImage)
    imgUrl.value = response.url || ''
    isLoading.value = false
  }

  return { imgUrl, isLoading, random }
}
