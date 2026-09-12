export const useIsHome = () => {
  const route = useRoute()
  return computed(() => route.name === 'index' && route.path === '/')
}
