import { ref } from 'vue'

import type { FetchRandomPhotoOptions } from '@/features/background/api/unsplash'

import { fetchRandomPhoto } from '@/features/background/api/unsplash'

export function useRandomBackground() {
  const imgUrl = ref('')
  const isLoading = ref(false)

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
