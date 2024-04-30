import { PROFILES_STORE_ID } from '~/utils/constants'

export const useProfilesStore = defineStore(PROFILES_STORE_ID, () => {
  const profile = ref(null)

  const setProfile = (user: any) => {
    if (!user) {
      return
    }
    profile.value = user
  }

  const resetStore = () => {
    profile.value = null
  }

  return { profile, setAuthUser: setProfile, resetStore }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfilesStore, import.meta.hot))
}
