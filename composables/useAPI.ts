import type { UseFetchOptions } from 'nuxt/app'
import { mockData } from '~/utils/mockData'

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const endpoint = typeof url === 'function' ? url() : url
  const cleanUrl = endpoint.replace(/^\//, '')

  const mockResponse = mockData[cleanUrl] || mockData[endpoint]

  if (mockResponse) {
    const transform = options?.transform as ((data: any) => any) | undefined
    const transformed = transform ? transform(mockResponse) : mockResponse

    return {
      data: ref(transformed),
      pending: ref(false),
      error: ref(null),
      refresh: async () => {},
      execute: async () => {},
    }
  }

  return useFetch(url, {
    deep: false,
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
