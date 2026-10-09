import { UNSPLASH_API_ORIGIN } from '@/shared/config/app'

export interface FetchRandomPhotoOptions {
  accessKey?: string
  tags?: string[]
  size?: [width: number, height: number]
}

interface UnsplashRandomPhoto {
  urls: {
    raw: string
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isUnsplashRandomPhoto(value: unknown): value is UnsplashRandomPhoto {
  if (!isRecord(value) || !isRecord(value.urls)) {
    return false
  }

  return typeof value.urls.raw === 'string'
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
  if (!options.accessKey) {
    return ''
  }

  try {
    const urlApi = new URL(`${UNSPLASH_API_ORIGIN}/photos/random/`)
    urlApi.searchParams.append('client_id', options.accessKey)
    urlApi.searchParams.append('orientation', 'landscape')

    if (options.tags && options.tags.length > 0) {
      urlApi.searchParams.append('query', options.tags.join(','))
    }

    const response = await fetch(urlApi)
    if (response.status !== 200) {
      return ''
    }

    const photo: unknown = await response.json()
    if (!isUnsplashRandomPhoto(photo)) {
      return ''
    }

    const urlPhoto = new URL(photo.urls.raw)

    if (options.size) {
      const [width, height] = options.size
      urlPhoto.searchParams.append('w', String(width))
      urlPhoto.searchParams.append('h', String(height))
    }

    const image = await preloadImage(urlPhoto.href)
    return image.src
  }
  catch {
    return ''
  }
}
