import { USERS_STORE_ID } from '~/utils/constants'

export const useUsersStore = defineStore(USERS_STORE_ID, () => {
  const authUser = ref(null)

  const setAuthUser = (user: any) => {
    if (!user) {
      return
    }
    authUser.value = user
  }

  const reset = () => {
    authUser.value = null
  }

  return { authUser, setAuthUser, reset }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
