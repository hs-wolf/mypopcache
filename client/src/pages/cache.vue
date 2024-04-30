<template>
  <div class="flex flex-col w-full max-w-[1024px] md:mx-auto gap-6 md:gap-9 p-3 md:p-9 overflow-auto">
    <h1 class="text-2xl">
      {{ user.email }}'s <span class="font-semibold">Cache</span>
    </h1>
    <div class="flex gap-3">
      <div class="flex items-center w-full gap-2 px-2 md:px-3 py-2 bg-secondary rounded-sm">
        <NuxtIcon name="search" class="text-primary-light text-xl md:text-2xl" />
        <input
          id="search"
          ref="searchRef"
          v-model="state.query"
          type="text"
          name="search"
          class="w-full bg-transparent outline-none max-h-5 md:max-h-6 text-primary leading-none"
        >
      </div>
      <div class="flex gap-1">
        <BaseButton :action="() => toggleDisplayMode('list')" icon="list" :theme="state.displayMode === 'list' ? 'secondary': 'primary'" />
        <BaseButton :action="() => toggleDisplayMode('grid')" icon="grid" :theme="state.displayMode === 'grid' ? 'secondary': 'primary'" />
      </div>
    </div>
    <span v-if="state.query" class="text-sm">{{ state.query }}</span>
    <div class="flex flex-col gap-3">
      <CacheItem v-for="item in state.items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType } from '~/types'

const user = useAuth.user()

const searchRef = ref<HTMLInputElement | null>(null)
const state = reactive<{
  displayMode: 'list' | 'grid',
  items: Item[],
  query: string
}>({
  displayMode: 'list',
  items: [
    {
      id: '0',
      profile_id: '0',
      type: ItemType.ANIME,
      label: 'Air Gear',
      season: '',
      episode: '',
      volume: '',
      chapter: '',
      link: 'https://google.com',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  query: ''
})

const toggleDisplayMode = (value: 'list' | 'grid') => {
  state.displayMode = value
}

definePageMeta({ middleware: ['online'] })

onMounted(() => {
  searchRef.value?.focus()
})
</script>

<style scoped>

</style>
