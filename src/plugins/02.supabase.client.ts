import type { Database } from '~/types'
import type { MiddlewareKey } from '~~/.nuxt/types/middleware'

export default defineNuxtPlugin(({ hook }) => {
  const localePath = useLocalePath()
  const route = useRoute()

  const pinia = usePinia()
  const alertsStore = useAlertsStore(pinia)
  const itemsStore = useItemsStore(pinia)

  const supabaseClient = useSupabaseClient<Database>()
  const supabaseAuth = supabaseClient.auth

  hook('app:suspense:resolve', () => {
    supabaseAuth.onAuthStateChange((_, session) => {
      try {
        useAuth.loaded().value = false
        const user = session?.user
        if (user) {
          useAuth.user().value = user
          itemsStore.getItems(user.id, true)
          // If the current route has a redirect, go for It.
          if (route.query.redirect) {
            navigateTo(localePath(route.query.redirect.toString()), { replace: true })
            return
          }
          // If the current route needs you logged out, go to home page.
          if (route.meta.middleware && (route.meta.middleware as MiddlewareKey[]).includes('offline')) {
            navigateTo(localePath('/'))
          }
        } else {
          useAuth.user().value = null
          itemsStore.reset()
          // If the current route has a redirect, go for It.
          if (route.query.redirect) {
            navigateTo(localePath(route.query.redirect.toString()), { replace: true })
            return
          }
          // If the current route needs you logged in, go to signin page.
          if (route.meta.middleware && (route.meta.middleware as MiddlewareKey[]).includes('online')) {
            navigateTo(localePath({ name: 'signin', query: { redirect: route.fullPath } }))
          }
        }
      } catch (error) {
        alertsStore.handlerError(error as Error)
      } finally {
        useAuth.loaded().value = true
      }
    })
  })

  return {
    provide: {
      supabaseAuth,
      supabaseClient
    }
  }
})
