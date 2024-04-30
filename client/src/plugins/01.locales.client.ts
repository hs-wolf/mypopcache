export default defineNuxtPlugin(() => {
  const pinia = usePinia()
  const localesStore = useLocalesStore(pinia)

  localesStore.loadLocale()
})
