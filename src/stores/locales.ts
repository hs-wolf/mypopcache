import { LOCALES_STORE_ID, LOCALE_STORAGE_KEY, SupportedDirections, SupportedLocales } from '~/utils/constants'

export const useLocalesStore = defineStore(LOCALES_STORE_ID, () => {
  const direction = ref(SupportedDirections.LTR)
  const rtlList = ref<SupportedLocales[]>([])

  function changeLocale (locale: SupportedLocales) {
    saveLocale(locale)
    rtlList.value.includes(locale) ? (direction.value = SupportedDirections.RTL) : (direction.value = SupportedDirections.LTR)
    const switchLocalePath = useSwitchLocalePath()
    navigateTo(switchLocalePath(locale))
  }

  function saveLocale (locale: SupportedLocales) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch (error) {
      useAlertsStore().handlerError(error as Error)
    }
  }

  function loadLocale () {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY) as SupportedLocales
    if (value) {
      changeLocale(value)
    }
  }

  return { direction, rtlList, changeLocale, saveLocale, loadLocale }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalesStore, import.meta.hot))
}
