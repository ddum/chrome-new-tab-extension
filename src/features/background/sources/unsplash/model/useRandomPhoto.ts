import { shallowRef } from 'vue'

import type { FetchRandomPhotoOptions } from '../api/fetchRandomPhoto'

import { fetchRandomPhoto } from '../api/fetchRandomPhoto'

export function useRandomPhoto() {
  const imgUrl = shallowRef('')
  const isLoading = shallowRef(false)

  async function random(options: FetchRandomPhotoOptions = {}): Promise<void> {
    isLoading.value = true
    try {
      imgUrl.value = await fetchRandomPhoto(options)
    }
    finally {
      isLoading.value = false
    }
  }

  return { imgUrl, isLoading, random }
}
