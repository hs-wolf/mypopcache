import type { EditableItem, Item } from '~/types'
import { ITEMS_STORE_ID, clientAuthHeader } from '~/utils'

export const useItemsStore = defineStore(ITEMS_STORE_ID, () => {
  const alertsStore = useAlertsStore()

  const state = reactive<{
    items: Item[],
    gettingItems: boolean,
    creatingItem: boolean,
    updatingItem: boolean,
    deletingItem: boolean
  }>({
    items: [],
    gettingItems: false,
    creatingItem: false,
    updatingItem: false,
    deletingItem: false
  })

  const reset = () => {
    state.items = []
  }

  const getItems = async (userId: string, myItems?: true) => {
    try {
      if (state.gettingItems) {
        return
      }
      state.gettingItems = true
      const { data, error } = await useNuxtApp().$supabaseClient
        .from('items')
        .select()
        .eq('user_id', userId)
      if (error) {
        throw error
      }
      if (myItems) {
        state.items = data as any || []
      }
      return data || []
    } catch (error) {
      alertsStore.handlerError(error)
    } finally {
      state.gettingItems = false
    }
  }

  const createItem = async (item: EditableItem) => {
    try {
      if (state.creatingItem) {
        return
      }
      state.creatingItem = true
      const { data, error } = await useNuxtApp().$supabaseClient
        .from('items')
        .insert({ ...item, user_id: (await useNuxtApp().$supabaseAuth.getUser()).data.user?.id ?? '' })
        .select()
      if (error) {
        throw error
      }
      if (data) {
        state.items.push(...data as any)
      }
      return data
    } catch (error) {
      alertsStore.handlerError(error)
    } finally {
      state.creatingItem = false
    }
  }

  const updateItem = async (id: string, newItem: EditableItem) => {
    try {
      if (state.updatingItem) {
        return
      }
      state.updatingItem = true
      const updatedItem: Item = await $fetch(`/api/items/${id}`, {
        method: 'PUT',
        body: newItem,
        headers: { ...clientAuthHeader() }
      })
      const indexToUpdate = state.items.findIndex(item => item.id === id)
      if (indexToUpdate < 0) {
        return
      }
      state.items[indexToUpdate] = updatedItem
      return state.items[indexToUpdate]
    } catch (error) {
      alertsStore.handlerError(error)
    } finally {
      state.updatingItem = false
    }
  }

  const deleteItem = async (id: string) => {
    try {
      if (state.deletingItem) {
        return
      }
      state.deletingItem = true
      await $fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: { ...clientAuthHeader() }
      })
      const indexToDelete = state.items.findIndex(item => item.id === id)
      if (indexToDelete < 0) {
        return
      }
      state.items.splice(indexToDelete, 1)
      return id
    } catch (error) {
      alertsStore.handlerError(error)
    } finally {
      state.deletingItem = false
    }
  }

  return { state, reset, getItems, createItem, updateItem, deleteItem }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemsStore, import.meta.hot))
}
