<template>
  <div v-auto-animate class="flex items-start gap-1.5">
    <button class="flex flex-col gap-1 w-full px-3 py-2 bg-primary-light rounded-sm" @click.prevent="emits('edit')">
      <div class="flex justify-between items-center gap-2">
        <span class="text-sm md:text-base">{{ item.label }}</span>
        <NuxtIcon name="edit" class="text-xl md:text-2xl text-secondary-dark" />
      </div>
      <span v-if="item.completed" class="text-start text-xs lg:text-sm text-action-light">
        Completed
      </span>
      <span v-if="concatenatedSubtitle" class="text-start text-secondary-dark text-xs lg:text-sm">
        {{ concatenatedSubtitle }}
      </span>
    </button>
    <BaseButton v-if="item.link" :action="openLink" icon="link" theme="primary" />
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType, type EditableItem } from '~/types'

const { t } = useI18n()

const props = defineProps<{ item: Item }>()

const emits = defineEmits<{(e: 'edit'): void}>()

const state = reactive<{
  editableItem: EditableItem | null,
}>({
  editableItem: null
})

const concatenatedSubtitle = computed(() => {
  if (props.item.type === ItemType.NONE) {
    return ''
  }
  return [
    t(`item-types.${props.item.type}`),
    props.item.season && [ItemType.ANIME, ItemType.SERIE].includes(props.item.type) ? `Season ${props.item.season}` : '',
    props.item.episode && props.item.type && [ItemType.ANIME, ItemType.SERIE].includes(props.item.type) ? `Episode ${props.item.episode}` : '',
    props.item.volume && props.item.type && [ItemType.BOOK, ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA].includes(props.item.type) ? `Volume ${props.item.volume}` : '',
    props.item.chapter && props.item.type && [ItemType.BOOK, ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA].includes(props.item.type) ? `Chapter ${props.item.chapter}` : ''
  ].filter(text => text).join(' • ')
}
)

const openLink = () => {
  if (props.item.link) {
    window.open(props.item.link, '_blank')
  }
}

onMounted(() => {
  state.editableItem = {
    type: props.item.type,
    label: props.item.label,
    season: props.item.season,
    episode: props.item.episode,
    volume: props.item.volume,
    chapter: props.item.chapter,
    completed: props.item.completed,
    link: props.item.link
  }
})
</script>

<style scoped>

</style>
