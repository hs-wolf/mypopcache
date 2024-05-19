<template>
  <div v-auto-animate class="flex flex-col">
    <div class="flex items-start gap-1.5">
      <button class="btn-effect flex flex-col gap-1 w-full px-3 py-2 bg-primary-light" @click.prevent="toggleEditing(true)">
        <div class="flex justify-between items-center gap-2">
          <span>{{ item.label }}</span>
          <NuxtIcon name="edit" class="text-xl md:text-2xl" />
        </div>
        <span v-if="item.completed" class="text-start text-xs lg:text-sm text-action-light">
          Completed
        </span>
        <span class="text-start text-secondary-dark text-xs lg:text-sm">
          {{ concatenatedSubtitle }}
        </span>
      </button>
      <BaseButton v-if="item.link" :action="openLink" icon="link" theme="primary" />
    </div>
    <div v-if="state.editing && state.editableItem" class="modal">
      <div ref="editingRef" class="flex flex-col gap-2 p-3 lg:min-w-[512px] lg:max-w-[512px] bg-primary-light rounded-sm overflow-auto">
        <button class="self-end mb-2" @click.prevent="toggleEditing(false)">
          <NuxtIcon name="x-close" class="text-xl md:text-2xl" />
        </button>
        <div class="flex flex-col md:flex-row gap-2">
          <select id="" v-model="state.editableItem.type" name="" class="max-h-9 md:max-h-10 px-2 md:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
            <option v-for="itemType in Object.values(ItemType)" :key="itemType" :value="itemType">
              {{ t(`item-types.${itemType}`) }}
            </option>
          </select>
          <input
            id=""
            v-model="state.editableItem.label"
            type="text"
            name=""
            placeholder="Label"
            class="custom-input"
          >
        </div>
        <div class="grid grid-cols-2 md:flex gap-2">
          <div v-if="showSeasonField" class="flex flex-col gap-0.5">
            <label for="">Season</label>
            <input
              id=""
              v-model="state.editableItem.season"
              type="text"
              name=""
              placeholder="Season"
              class="custom-input"
            >
          </div>
          <div v-if="showEpisodeField" class="flex flex-col gap-0.5">
            <label for="">Episode</label>
            <input
              id=""
              v-model="state.editableItem.episode"
              type="text"
              name=""
              placeholder="Episode"
              class="custom-input"
            >
          </div>
          <div v-if="showVolumeField" class="flex flex-col gap-0.5">
            <label for="">Volume</label>
            <input
              id=""
              v-model="state.editableItem.volume"
              type="text"
              name=""
              placeholder="Volume"
              class="custom-input"
            >
          </div>
          <div v-if="showChapterField" class="flex flex-col gap-0.5">
            <label for="">Chapter</label>
            <input
              id=""
              v-model="state.editableItem.chapter"
              type="text"
              name=""
              placeholder="Chapter"
              class="custom-input"
            >
          </div>
        </div>
        <div v-if="showLinkField" v-auto-animate class="col-span-2 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <input id="showLink" v-model="state.showLink" type="checkbox" name="showLink" class="w-5 h-5">
            <label for="showLink">Link</label>
          </div>
          <input
            v-if="state.showLink"
            id=""
            v-model="state.editableItem.link"
            type="text"
            name=""
            placeholder="Link"
            class="custom-input"
          >
        </div>
        <div class="flex justify-between ms-auto gap-2 mt-3">
          <BaseButton :action="saveItem" label="Save" icon="save" theme="action" />
          <BaseButton :action="deleteItem" icon="trash" theme="danger" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType, type EditableItem } from '~/types'

const { t } = useI18n()

const props = defineProps<{ item: Item }>()

const editingRef = ref<HTMLElement | null>(null)
const state = reactive<{
  editing: boolean,
  editableItem: EditableItem | null,
  showLink: boolean
}>({
  editing: false,
  editableItem: null,
  showLink: false
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

const showSeasonField = computed(() => state.editableItem?.type && [ItemType.ANIME, ItemType.SERIE].includes(state.editableItem.type))

const showEpisodeField = computed(() => state.editableItem?.type && [ItemType.ANIME, ItemType.SERIE].includes(state.editableItem.type))

const showVolumeField = computed(() => state.editableItem?.type && [ItemType.BOOK, ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA].includes(state.editableItem.type))

const showChapterField = computed(() => state.editableItem?.type && [ItemType.BOOK, ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA].includes(state.editableItem.type))

const showLinkField = computed(() => state.editableItem?.type !== ItemType.NONE)

const toggleEditing = (value?: boolean) => {
  state.editing = value ?? !state.editing
}

const openLink = () => {
  if (props.item.link) {
    window.open(props.item.link, '_blank')
  }
}

const saveItem = () => {
  toggleEditing(false)
}

const deleteItem = () => {
  toggleEditing(false)
}

onClickOutside(editingRef, () => {
  if (state.editing) {
    toggleEditing(false)
  }
})

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
  if (state.editableItem.link) {
    state.showLink = true
  }
})
</script>

<style scoped>

</style>
