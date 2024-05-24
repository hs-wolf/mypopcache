<template>
  <button
    type="button"
    :class="finalTheme"
    :disabled="disabled"
    class="flex justify-center items-center gap-1 lg:gap-2 px-3 py-2 rounded-sm disabled:opacity-50"
    @click.prevent="emits('action')"
  >
    <NuxtIcon v-if="icon" :name="icon" filled class="text-icon" />
    <span v-if="label" class="font-semibold whitespace-nowrap">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string,
    icon?: string,
    theme?: 'primary' | 'secondary' | 'accent' | 'action' | 'warning' | 'danger',
    disabled?: boolean
  }>()

const emits = defineEmits<{(e: 'action'): void}>()

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
      return 'text-danger-light active:text-danger-dark'
    default:
      return 'bg-primary-light text-secondary active:bg-primary-dark'
  }
})
</script>

<style scoped>

</style>
