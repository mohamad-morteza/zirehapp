export default defineNuxtRouteMiddleware((to) => {
  const { path, query, hash } = to

  // 1. Add trailing slash (but skip if already present or root)
  if (path !== '/' && !path.endsWith('/')) {
    return navigateTo({ path: path + '/', query, hash }, { redirectCode: 301 })
  }

  // 2. Redirect all /blog/* to home
  if (path.startsWith('/blog/')) {
    return navigateTo({ path: '/', query, hash }, { redirectCode: 301 })
  }
})
