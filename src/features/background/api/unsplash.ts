import { UNSPLASH_ACCESS_KEY, UNSPLASH_API_ORIGIN } from '@/shared/config/app'

export interface FetchRandomPhotoOptions {
  tags?: string[]
  size?: number[]
}

function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image'))
  })
}

export async function fetchRandomPhoto(options: FetchRandomPhotoOptions = {}): Promise<string> {
  try {
    const urlApi = new URL(`${UNSPLASH_API_ORIGIN}/photos/random/`)
    urlApi.searchParams.append('client_id', UNSPLASH_ACCESS_KEY)
    urlApi.searchParams.append('orientation', 'landscape')

    if (options.tags && options.tags.length > 0) {
      urlApi.searchParams.append('query', options.tags.join(','))
    }

    const response = await fetch(urlApi)
    if (response.status !== 200) {
      return ''
    }

    const photo = await response.json()
    const urlPhoto = new URL(photo.urls.raw)

    if (options.size && options.size.length > 0) {
      const [w, h] = options.size
      urlPhoto.searchParams.append('w', String(w))
      urlPhoto.searchParams.append('h', String(h))
    }

    const image = await preloadImage(urlPhoto.href)
    return image.src
  }
  catch {
    return ''
  }
}
