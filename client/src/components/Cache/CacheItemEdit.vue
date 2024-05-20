<template>
  <div v-if="state.editableItem" class="modal">
    <div ref="cardRef" class="flex flex-col gap-2 p-3 w-full lg:w-auto lg:min-w-[512px] lg:max-w-[512px] bg-primary-light rounded-sm overflow-auto">
      <button class="self-end mb-2" @click.prevent="emits('close')">
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
        <div v-if="allowedTypesSeason.includes(state.editableItem.type)" class="flex flex-col gap-0.5">
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
        <div v-if="allowedTypesEpisode.includes(state.editableItem.type)" class="flex flex-col gap-0.5">
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
        <div v-if="allowedTypesVolume.includes(state.editableItem.type)" class="flex flex-col gap-0.5">
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
        <div v-if="allowedTypesChapter.includes(state.editableItem.type)" class="flex flex-col gap-0.5">
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
      <div v-if="state.editableItem.type !== ItemType.NONE" v-auto-animate class="col-span-2 flex flex-col gap-2">
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
      <div class="col-span-2 flex items-center gap-2">
        <input id="completed" v-model="state.editableItem.completed" type="checkbox" name="completed" class="w-5 h-5">
        <label for="completed">Completed</label>
      </div>
      <div class="flex justify-between ms-auto gap-2 mt-3">
        <BaseButton :action="saveItem" label="Save" icon="save" theme="action" />
        <BaseButton :action="() => emits('delete')" icon="trash" theme="danger" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType, type EditableItem } from '~/types'

const { t } = useI18n()

const props = defineProps<{ item: Item }>()

const emits = defineEmits<{(e: 'close'): void, (e: 'save', item: EditableItem): void, (e: 'delete'): void}>()

const state = reactive<{
  editableItem: EditableItem | null,
  showLink: boolean
}>({
  editableItem: null,
  showLink: false
})

const cardRef = ref<HTMLElement | null>(null)

const allowedTypesSeason = [ItemType.ANIME, ItemType.SERIE]

const allowedTypesEpisode = [ItemType.ANIME, ItemType.SERIE]

const allowedTypesVolume = [ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA]

const allowedTypesChapter = [ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA]

const saveItem = () => {
  if (!state.editableItem) {
    emits('close')
    return
  }
  if (!state.showLink) {
    state.editableItem.link = undefined
  }
  emits('save', state.editableItem)
}

onClickOutside(cardRef, () => {
  emits('close')
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
