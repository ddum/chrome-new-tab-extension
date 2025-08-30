import { ref } from 'vue'

interface options {
  tags?: string[]
  size?: number[]
}

const API_KEY = 'F3Lq5bwhNJdj_SbtRdcoMWaU2uW0Qd3iqeTrp9kXQOI'

function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image'))
  })
}

export function useBackground() {
  const imgUrl = ref('')
  const isLoading = ref(false)

  async function random(options: options = {}): Promise<void> {
    isLoading.value = true

    const urlApi = new URL('https://api.unsplash.com/photos/random/')
    urlApi.searchParams.append('client_id', API_KEY)
    urlApi.searchParams.append('orientation', 'landscape')

    if (options.tags && options.tags.length > 0) {
      urlApi.searchParams.append('query', options.tags.join(','))
    }

    const response = await fetch(urlApi)
    if (response.status === 200) {
      const photo = await response.json()
      const urlPhoto = new URL(photo.urls.raw)

      if (options.size && options.size.length > 0) {
        urlPhoto.searchParams.append('w', options.size[0].toString())
        urlPhoto.searchParams.append('h', options.size[1].toString())
      }

      const image = await preloadImage(urlPhoto.href)
      imgUrl.value = image.src
    }
    else {
      imgUrl.value = ''
    }

    isLoading.value = false
  }

  return { imgUrl, isLoading, random }
}
