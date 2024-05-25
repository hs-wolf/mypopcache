<template>
  <div v-auto-animate class="flex flex-col w-full max-w-[1024px] lg:mx-auto gap-6 lg:gap-9 p-3 lg:p-9 overflow-auto">
    <h1 class="text-xl lg:text-2xl">
      {{ user.email }}'s <span class="font-semibold">Cache</span>
    </h1>
    <div class="flex flex-col lg:flex-row gap-3">
      <div class="flex items-center gap-2 px-2 w-full lg:px-3 py-2 bg-secondary rounded-sm">
        <NuxtIcon name="search" class="text-primary-light text-xl lg:text-2xl" />
        <input
          id="search"
          ref="searchInputRef"
          v-model="state.query"
          type="text"
          name="search"
          class="flex-1 bg-transparent outline-none max-h-5 lg:max-h-6 text-primary leading-none"
        >
        <button
          v-if="state.query"
        >
          <NuxtIcon
            name="x-close"
            class="text-primary-light text-xl lg:text-2xl"
            @click.prevent="state.query = ''"
          />
        </button>
      </div>
      <div class="flex gap-3">
        <select id="filterMode" v-model="state.filterMode" name="filterMode" class="w-full lg:w-auto max-h-9 lg:max-h-10 px-2 lg:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
          <option v-for="filter in Object.values(ItemFilters)" :key="filter" :value="filter">
            {{ $t(`item-filters.${filter}`) }}
          </option>
        </select>
        <select id="filterType" v-model="state.filterType" name="filterType" class="w-full lg:w-auto max-h-9 lg:max-h-10 px-2 lg:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
          <option v-for="filter in ['ALL', ...Object.values(ItemType)]" :key="filter" :value="filter">
            {{ $t(`item-types.${filter}`) }}
          </option>
        </select>
      </div>
      <div class="hidden lg:flex gap-1">
        <BaseButton
          icon="list"
          :theme="state.displayMode === 'list' ? 'secondary': 'primary'"
          @action="toggleDisplayMode('list')"
        />
        <BaseButton
          icon="grid"
          :theme="state.displayMode === 'grid' ? 'secondary': 'primary'"
          @action="toggleDisplayMode('grid')"
        />
      </div>
      <BaseButton
        label="New Item"
        icon="add"
        theme="accent"
        @action="toggleNewItemModal(true)"
      />
    </div>
    <span v-if="state.query" class="text-sm">{{ queryLabel }}</span>
    <div class="gap-3" :class="state.displayMode === 'list' ? 'flex flex-col' : 'grid grid-cols-2'">
      <CacheListItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @edit="setEditingItemIndex(item.id)"
      />
    </div>
    <CacheNewItemModal
      v-if="state.showNewItemModal"
      @close="toggleNewItemModal(false)"
    />
    <CacheEditItemModal
      v-if="state.editingItemIndex >= 0"
      :item="itemsStoreState.items[state.editingItemIndex]"
      @close="setEditingItemIndex('')"
      @save="saveEditingItem"
      @delete="deleteEditingItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ItemType, type EditableItem, ItemFilters } from '~/types'

definePageMeta({ middleware: ['online'] })

const user = useAuth.user()
const itemsStore = useItemsStore()
const { state: itemsStoreState } = storeToRefs(itemsStore)

const searchInputRef = ref<HTMLInputElement | null>(null)

const state = reactive<{
  query: string,
  displayMode: 'list' | 'grid',
  filterMode: ItemFilters,
  filterType: ItemType | 'ALL',
  editingItemIndex: number,
  showNewItemModal: boolean
}>({
  query: '',
  displayMode: 'list',
  filterMode: ItemFilters.ALL,
  filterType: 'ALL',
  editingItemIndex: -1,
  showNewItemModal: false
})

const queryLabel = computed(() => {
  return `${filteredItems.value.length} results for: ${state.query}`
})

// Mocked filtering, the final version will query directly from the DB.
const filteredItems = computed(() => {
  let list = itemsStoreState.value.items
  if (state.filterMode === ItemFilters.ONGOING) {
    list = list.filter(item => !item.completed)
  }
  if (state.filterMode === ItemFilters.COMPLETED) {
    list = list.filter(item => item.completed)
  }
  if (state.filterType !== 'ALL') {
    list = list.filter(item => item.type === state.filterType)
  }
  if (!state.query) {
    return list
  }
  return list.filter(item => item.label.toLowerCase().includes(state.query.toLowerCase()))
})

const toggleDisplayMode = (value: 'list' | 'grid') => {
  state.displayMode = value
}

const toggleNewItemModal = (value?: boolean) => {
  state.showNewItemModal = value ?? !state.showNewItemModal
}

const setEditingItemIndex = (id: string) => {
  if (!id) {
    state.editingItemIndex = -1
    return
  }
  const itemIndexToEdit = itemsStoreState.value.items.findIndex(item => item.id === id)
  if (itemIndexToEdit < 0) {
    state.editingItemIndex = -1
    return
  }
  state.editingItemIndex = itemIndexToEdit
}

const saveEditingItem = (editableItem: EditableItem) => {
  const indexToUpdate = state.editingItemIndex
  setEditingItemIndex('')
  if (!editableItem.type || !editableItem.label) {
    return
  }
  itemsStoreState.value.items[indexToUpdate] = {
    ...itemsStoreState.value.items[indexToUpdate],
    type: editableItem.type,
    label: editableItem.label,
    season: editableItem.season,
    episode: editableItem.episode,
    volume: editableItem.volume,
    chapter: editableItem.chapter,
    completed: editableItem.completed,
    link: editableItem.link
  }
}

const deleteEditingItem = () => {
  const indexToDelete = state.editingItemIndex
  setEditingItemIndex('')
  itemsStoreState.value.items.splice(indexToDelete, 1)
}

onMounted(() => {
  searchInputRef.value?.focus()
})
</script>

<style scoped>

</style>
