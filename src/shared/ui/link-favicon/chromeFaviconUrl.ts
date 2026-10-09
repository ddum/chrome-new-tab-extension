const FAVICON_PIXEL_SIZE = '32'

interface ChromeRuntimeLike {
  getURL: (path: string) => string
}

function pageUrlFrom(address: string): string | null {
  const withScheme = address.includes('://') ? address : `https://${address}`

  try {
    return new URL(withScheme).href
  }
  catch {
    return null
  }
}

function readRuntime(): ChromeRuntimeLike | null {
  const runtime = (globalThis as typeof globalThis & {
    chrome?: {
      runtime?: ChromeRuntimeLike
    }
  }).chrome?.runtime

  if (!runtime || typeof runtime.getURL !== 'function')
    return null

  return runtime
}

export function chromeFaviconUrl(address: string): string | null {
  const pageUrl = pageUrlFrom(address)
  const runtime = readRuntime()

  if (!pageUrl || !runtime)
    return null

  try {
    // getURL нельзя отрывать от runtime: иначе Chrome бросает Illegal invocation.
    const url = new URL(runtime.getURL('/_favicon/'))
    url.searchParams.set('pageUrl', pageUrl)
    url.searchParams.set('size', FAVICON_PIXEL_SIZE)
    return url.toString()
  }
  catch {
    return null
  }
}
