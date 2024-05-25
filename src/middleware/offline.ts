import type { MiddlewareKey } from '#build/types/middleware'

export default defineNuxtRouteMiddleware((_to, from) => {
  const localePath = useLocalePath()
  const user = useAuth.user().value

  if (user) {
    if ((from.meta.middleware && (from.meta.middleware as MiddlewareKey[]).includes('offline'))) {
      return navigateTo(localePath({ name: 'index' }))
    }
    return navigateTo(from)
  }
})
