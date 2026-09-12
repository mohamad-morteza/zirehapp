export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const token = useCookie('AuthToken')
  const local = useCookie('Locale')

  const api = $fetch.create({
    baseURL: config.public.baseUrl,
    onRequest({ options }) {
      if (token.value) options.headers.set('Authorization', 'Bearer ' + token.value)
      options.headers.set('accept-language', local.value || 'fa')
    },
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  }
})
