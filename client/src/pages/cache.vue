<template>
  <div v-auto-animate class="flex flex-col w-full max-w-[1024px] md:mx-auto gap-6 md:gap-9 p-3 md:p-9 overflow-auto">
    <h1 class="text-xl lg:text-2xl">
      {{ user.email }}'s <span class="font-semibold">Cache</span>
    </h1>
    <div class="flex flex-col lg:flex-row gap-3">
      <div class="flex items-center gap-2 px-2 w-full md:px-3 py-2 bg-secondary rounded-sm">
        <NuxtIcon name="search" class="text-primary-light text-xl md:text-2xl" />
        <input
          id="search"
          ref="searchInputRef"
          v-model="state.query"
          type="text"
          name="search"
          class="flex-1 bg-transparent outline-none max-h-5 md:max-h-6 text-primary leading-none"
        >
        <button
          v-if="state.query"
        >
          <NuxtIcon
            name="x-close"
            class="text-primary-light text-xl md:text-2xl"
            @click.prevent="state.query = ''"
          />
        </button>
      </div>
      <div class="flex gap-3">
        <select id="filterMode" v-model="state.filterMode" name="filterMode" class="w-full lg:w-auto max-h-9 md:max-h-10 px-2 md:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
          <option v-for="filter in Object.values(ItemFilters)" :key="filter" :value="filter">
            {{ $t(`item-filters.${filter}`) }}
          </option>
        </select>
        <select id="filterType" v-model="state.filterType" name="filterType" class="w-full lg:w-auto max-h-9 md:max-h-10 px-2 md:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
          <option v-for="filter in ['ALL', ...Object.values(ItemType)]" :key="filter" :value="filter">
            {{ $t(`item-types.${filter}`) }}
          </option>
        </select>
      </div>
      <div class="hidden lg:flex gap-1">
        <BaseButton
          :action="() => toggleDisplayMode('list')"
          icon="list"
          :theme="state.displayMode === 'list' ? 'secondary': 'primary'"
        />
        <BaseButton
          :action="() => toggleDisplayMode('grid')"
          icon="grid"
          :theme="state.displayMode === 'grid' ? 'secondary': 'primary'"
        />
      </div>
    </div>
    <span v-if="state.query" class="text-sm">{{ queryLabel }}</span>
    <div class="gap-3" :class="state.displayMode === 'list' ? 'flex flex-col' : 'grid grid-cols-2'">
      <CacheItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @edit="setEditingItem(item.id)"
      />
    </div>
    <CacheItemEdit
      v-if="state.editingItemIndex >= 0"
      :item="state.items[state.editingItemIndex]"
      @close="setEditingItem('')"
      @save="saveItem"
      @delete="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType, type EditableItem, ItemFilters } from '~/types'

definePageMeta({ middleware: ['online'] })

const user = useAuth.user()

const searchInputRef = ref<HTMLInputElement | null>(null)

const state = reactive<{
  query: string,
  displayMode: 'list' | 'grid',
  filterMode: ItemFilters,
  filterType: ItemType | 'ALL',
  editingItemIndex: number,
  items: Item[],
}>({
  query: '',
  displayMode: 'list',
  filterMode: ItemFilters.ALL,
  filterType: 'ALL',
  editingItemIndex: -1,
  items: [
    {
      id: '0',
      profile_id: '0',
      type: ItemType.SERIE,
      label: 'Arcane',
      season: '2',
      episode: '7',
      completed: true,
      link: 'https://google.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '1',
      profile_id: '0',
      type: ItemType.ANIME,
      label: 'Jujutsu Kaizen',
      season: '2',
      episode: '2',
      completed: false,
      link: 'https://google.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '2',
      profile_id: '0',
      type: ItemType.MANGA,
      label: 'Monster',
      volume: '1',
      chapter: '6',
      completed: false,
      link: 'https://google.com',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
})

const queryLabel = computed(() => {
  return `${filteredItems.value.length} results for: ${state.query}`
})

// Mocked filtering, the final version will query directly from the DB.
const filteredItems = computed(() => {
  let list = state.items
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

const setEditingItem = (id: string) => {
  if (!id) {
    state.editingItemIndex = -1
    return
  }
  const itemIndexToEdit = state.items.findIndex(item => item.id === id)
  if (itemIndexToEdit < 0) {
    state.editingItemIndex = -1
    return
  }
  state.editingItemIndex = itemIndexToEdit
}

const saveItem = (editableItem: EditableItem) => {
  const indexToUpdate = state.editingItemIndex
  setEditingItem('')
  if (!editableItem.type || !editableItem.label) {
    return
  }
  state.items[indexToUpdate] = {
    ...state.items[indexToUpdate],
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

const deleteItem = () => {
  const indexToDelete = state.editingItemIndex
  setEditingItem('')
  state.items.splice(indexToDelete, 1)
}

onMounted(() => {
  searchInputRef.value?.focus()
})
</script>

<style scoped>

</style>
