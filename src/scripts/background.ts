import { useAppStore } from '@/stores'

async function randomBackground(): Promise<void> {
  const appStore = useAppStore()

  const url = `https://source.unsplash.com/random/${window.innerWidth}x${
    window.innerHeight
  }/?${appStore.backgroundTags.join(',')}`
  await fetch(url).then((response) => {
    appStore.setBackgroundUrl(response.url || '')
  })
}

export { randomBackground }
