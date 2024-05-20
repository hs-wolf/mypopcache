<template>
  <button type="button" :class="finalTheme" class="flex justify-center items-center gap-2 px-3 py-2 shadow rounded-sm disabled:opacity-50" @click.prevent="actionHandler">
    <span v-if="label" class="text-sm md:text-base font-semibold whitespace-nowrap">{{ label }}</span>
    <NuxtIcon v-if="icon" :name="icon" filled class="text-xl md:text-2xl" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ action: Function, label?: string, icon?: string, theme?: 'primary' | 'secondary' | 'accent' | 'action' | 'warning' | 'danger' }>()

const finalTheme = computed(() => {
  switch (props.theme) {
    case 'primary':
      return 'bg-primary-light text-secondary active:bg-primary-dark'
    case 'secondary':
      return 'bg-secondary-light text-primary active:bg-secondary-dark'
    case 'accent':
      return 'bg-accent-light text-secondary active:bg-accent-dark'
    case 'action':
      return 'bg-action-light text-secondary active:bg-action-dark'
    case 'warning':
      return 'bg-warning-light text-secondary active:bg-warning-dark'
    case 'danger':
      return 'bg-danger-light text-secondary active:bg-danger-dark'
    default:
      return 'bg-primary-light text-secondary active:bg-primary-dark'
  }
})

const actionHandler = () => {
  props.action()
}
</script>

<style scoped>

</style>
