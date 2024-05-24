<template>
  <div class="modal">
    <div ref="cardRef" class="flex flex-col gap-3 lg:gap-5 p-3 lg:p-5 w-full lg:w-[512px] bg-primary-light rounded-sm overflow-auto">
      <div class="flex justify-between">
        <p class="text-secondary-dark font-semibold">
          {{ t('components.cache.edit-item-modal.title') }}
        </p>
        <button class="self-end" :disabled="disableInputs" @click.prevent="emits('close')">
          <NuxtIcon name="x-close" class="text-icon" />
        </button>
      </div>
      <div v-auto-animate class="flex flex-col gap-3 lg:gap-5">
        <BaseSelect
          v-model="state.editableItem.type"
          name="item-type"
          :options="TYPE_OPTIONS"
          :label="t('components.cache.edit-item-modal.type')"
          :disabled="disableInputs"
        />
        <BaseTextInput
          v-model="state.editableItem.label"
          name="label"
          :label="t('components.cache.edit-item-modal.label')"
          :disabled="disableInputs"
        />
        <div v-if="!hideExtraFields" v-auto-animate class="flex flex-col lg:flex gap-3 lg:gap-5">
          <BaseTextInput
            v-if="showSeasonAndEpisode"
            v-model="state.editableItem.season"
            name="season"
            :label="t('components.cache.edit-item-modal.season')"
            :disabled="disableInputs"
          />
          <BaseTextInput
            v-if="showSeasonAndEpisode"
            v-model="state.editableItem.episode"
            name="episode"
            :label="t('components.cache.edit-item-modal.episode')"
            :disabled="disableInputs"
          />
          <BaseTextInput
            v-if="showVolumeAndChaper"
            v-model="state.editableItem.volume"
            name="volume"
            :label="t('components.cache.edit-item-modal.volume')"
            :disabled="disableInputs"
          />
          <BaseTextInput
            v-if="showVolumeAndChaper"
            v-model="state.editableItem.chapter"
            name="chapter"
            :label="t('components.cache.edit-item-modal.chapter')"
            :disabled="disableInputs"
          />
        </div>
        <div class="flex flex-col lg:flex-row gap-3 lg:gap-5">
          <BaseCheckbox
            v-model="state.showLink"
            name="show-link"
            :label="t('components.cache.edit-item-modal.link')"
          />
          <BaseTextInput
            v-if="state.showLink"
            v-model="state.editableItem.link"
            name="link"
            :disabled="disableInputs"
          />
        </div>
        <BaseCheckbox
          v-model="state.editableItem.completed"
          name="completed"
          :label="t('components.cache.edit-item-modal.completed')"
        />
      </div>
      <div class="flex justify-between ms-auto gap-1 lg:gap-3">
        <BaseButton
          :label="t('general.delete')"
          :icon="itemsStoreState.deletingItem ? 'loading' : 'trash'"
          theme="danger"
          :disabled="disableInputs"
          @action="deleteItem"
        />
        <BaseButton
          :label="t('general.update')"
          :icon="itemsStoreState.updatingItem ? 'loading' : 'save'"
          theme="action"
          :disabled="disableInputs"
          @action="updateItem"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TYPE_OPTIONS } from '~/utils/constants'
import { type Item, ItemType, type EditableItem } from '~/types'

const { t } = useI18n()
const itemsStore = useItemsStore()
const { state: itemsStoreState } = storeToRefs(itemsStore)

const props = defineProps<{ item: Item }>()

const emits = defineEmits<{(e: 'close'): void}>()

const state = reactive<{
  editableItem: EditableItem,
  showLink: boolean
}>({
  editableItem: {
    type: props.item.type,
    label: props.item.label,
    season: props.item.season,
    episode: props.item.episode,
    volume: props.item.volume,
    chapter: props.item.chapter,
    completed: props.item.completed,
    link: props.item.link
  },
  showLink: !!props.item.link
})

const cardRef = ref<HTMLElement | null>(null)

const hideExtraFields = computed(() => [ItemType.NONE, ItemType.BOOK, ItemType.MOVIE].includes(state.editableItem.type))

const showSeasonAndEpisode = computed(() => [ItemType.ANIME, ItemType.SERIE].includes(state.editableItem.type))

const showVolumeAndChaper = computed(() => [ItemType.COMIC, ItemType.MANGA, ItemType.MANHUA, ItemType.MANHWA].includes(state.editableItem.type))

const disableInputs = computed(() => itemsStoreState.value.updatingItem || itemsStoreState.value.updatingItem)

const updateItem = async () => {
  if (!state.showLink) {
    state.editableItem.link = undefined
  }
  const updatedItem = await itemsStore.updateItem(props.item.id, state.editableItem)
  if (updatedItem) {
    close()
  }
}

const deleteItem = async () => {
  if (!state.showLink) {
    state.editableItem.link = undefined
  }
  const deletedId = await itemsStore.deleteItem(props.item.id)
  if (deletedId) {
    close()
  }
}

const close = () => {
  if (disableInputs.value) {
    return
  }
  emits('close')
}

onClickOutside(cardRef, () => close())
</script>

<style scoped>

</style>
