import { useBackgroundStore } from '@/stores/background'

async function randomBackground(): Promise<void> {
  const backgroundStore = useBackgroundStore()

  const url = `https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/`
  await fetch(url).then((response) => {
    backgroundStore.set({ url: response.url })
  })
}

export { randomBackground }
