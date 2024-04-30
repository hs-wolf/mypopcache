<template>
  <div v-auto-animate class="relative flex flex-col">
    <div class="flex gap-1.5">
      <button class="btn-effect flex justify-between items-center gap-2 w-full px-3 py-2 bg-primary-light" @click.prevent="toggleEditing(true)">
        <span>{{ item.label }}</span>
        <NuxtIcon name="edit" class="text-xl md:text-2xl" />
      </button>
      <BaseButton v-if="item.link" :action="openLink" icon="link" theme="primary" />
    </div>
    <div v-if="state.editing && state.newItem" class="modal">
      <div ref="editingRef" class="flex flex-col gap-2 p-3 max-w-[512px] bg-primary-light overflow-auto">
        <div class="flex flex-col md:flex-row gap-2">
          <select id="" name="" class="max-h-9 md:max-h-10 px-2 md:px-3 py-2 bg-secondary rounded-sm text-primary leading-none outline-none">
            <option v-for="itemType in Object.values(ItemType)" :key="itemType" :value="itemType">
              {{ itemType }}
            </option>
          </select>
          <input
            id=""
            v-model="state.newItem.label"
            type="text"
            name=""
            placeholder="Label"
            class="custom-input"
          >
        </div>
        <div class="grid grid-cols-2 md:flex gap-2">
          <div class="flex flex-col gap-0.5">
            <label for="">Season</label>
            <input
              id=""
              v-model="state.newItem.season"
              type="text"
              name=""
              placeholder="Season"
              class="custom-input"
            >
          </div>
          <div class="flex flex-col gap-0.5">
            <label for="">Episode</label>
            <input
              id=""
              v-model="state.newItem.episode"
              type="text"
              name=""
              placeholder="Episode"
              class="custom-input"
            >
          </div>
          <div class="flex flex-col gap-0.5">
            <label for="">Volume</label>
            <input
              id=""
              v-model="state.newItem.volume"
              type="text"
              name=""
              placeholder="Volume"
              class="custom-input"
            >
          </div>
          <div class="flex flex-col gap-0.5">
            <label for="">Chapter</label>
            <input
              id=""
              v-model="state.newItem.chapter"
              type="text"
              name=""
              placeholder="Chapter"
              class="custom-input"
            >
          </div>
        </div>
        <div v-auto-animate class="col-span-2 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <input id="showLink" v-model="state.showLink" type="checkbox" name="showLink" class="w-5 h-5">
            <label for="showLink">Link</label>
          </div>
          <input
            v-if="state.showLink"
            id=""
            v-model="state.newItem.link"
            type="text"
            name=""
            placeholder="Link"
            class="custom-input"
          >
          <div class="flex justify-between ms-auto gap-2 mt-3">
            <BaseButton :action="saveItem" label="Save" icon="save" theme="action" />
            <BaseButton :action="deleteItem" icon="trash" theme="danger" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Item, ItemType, type EditableItem } from '~/types'

const props = defineProps<{ item: Item }>()

const editingRef = ref<HTMLElement | null>(null)
const state = reactive<{
  editing: boolean,
  newItem: EditableItem | null,
  showLink: boolean
}>({
  editing: false,
  newItem: null,
  showLink: false
})

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
  state.newItem = {
    type: props.item.type,
    label: props.item.label,
    season: props.item.season,
    episode: props.item.episode,
    volume: props.item.volume,
    chapter: props.item.chapter,
    link: props.item.link
  }
  if (state.newItem.link) {
    state.showLink = true
  }
})
</script>

<style scoped>

</style>
