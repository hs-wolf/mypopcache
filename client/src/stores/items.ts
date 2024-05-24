import type { EditableItem, Item } from '~/types'
import { ITEMS_STORE_ID } from '~/utils/constants'

export const useItemsStore = defineStore(ITEMS_STORE_ID, () => {
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

  const getItems = async () => {
    try {
      if (state.gettingItems) {
        return
      }
      state.gettingItems = true
      const items: Item[] = await $fetch('/api/items', { method: 'GET', headers: useRequestHeaders(['cookie']) })
      state.items = items
    } catch (error) {
      useAlertsStore().handlerError(error)
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
      const createdItem: Item = await $fetch('/api/items', { method: 'POST', body: item, headers: useRequestHeaders(['cookie']) })
      state.items.push(createdItem)
      return createdItem
    } catch (error) {
      useAlertsStore().handlerError(error)
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
      const updatedItem: Item = await $fetch(`/api/items/${id}`, { method: 'PUT', body: newItem, headers: useRequestHeaders(['cookie']) })
      const indexToUpdate = state.items.findIndex(item => item.id === id)
      if (indexToUpdate < 0) {
        return
      }
      state.items[indexToUpdate] = updatedItem
      return state.items[indexToUpdate]
    } catch (error) {
      useAlertsStore().handlerError(error)
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
      await $fetch(`/api/items/${id}`, { method: 'DELETE', headers: useRequestHeaders(['cookie']) })
      const indexToDelete = state.items.findIndex(item => item.id === id)
      if (indexToDelete < 0) {
        return
      }
      state.items.splice(indexToDelete, 1)
      return id
    } catch (error) {
      useAlertsStore().handlerError(error)
    } finally {
      state.deletingItem = false
    }
  }

  return { state, reset, getItems, createItem, updateItem, deleteItem }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemsStore, import.meta.hot))
}
