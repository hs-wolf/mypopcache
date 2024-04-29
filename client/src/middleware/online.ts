export default defineNuxtRouteMiddleware((to, _from) => {
  const localePath = useLocalePath()
  const user = useAuth.user().value

  if (!user) {
    return navigateTo(localePath({ name: 'signin', query: { redirect: to.fullPath } }))
  }
})
