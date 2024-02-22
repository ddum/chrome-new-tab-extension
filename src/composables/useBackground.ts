import { ref } from 'vue'

interface options {
  tags?: string[]
  size?: number[]
}

export function useBackground() {
  const imgUrl = ref('')
  const isLoading = ref(false)

  async function random(options: options = {}): Promise<void> {
    isLoading.value = true
    let urlImage = `https://source.unsplash.com/random/`

    if (options.size && options.size.length > 0) {
      urlImage += `${options.size[0]}x${options.size[1]}/`
    }
    if (options.tags && options.tags.length > 0) {
      urlImage += `?${options.tags.join(',')}`
    }

    const response = await fetch(urlImage)
    imgUrl.value = response.url || ''
    isLoading.value = false
  }

  return { imgUrl, isLoading, random }
}
