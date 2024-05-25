<template>
  <div class="flex items-center w-full">
    <label v-if="label" :for="`text-input-${name}`" class="px-3 py-2 bg-secondary-dark rounded-l-sm text-primary-light">{{ label }}</label>
    <input
      :id="`text-input-${name}`"
      v-model="model"
      :placeholder="placeholder"
      class="w-full h-9 lg:h-10 px-3 py-2 bg-secondary text-primary leading-none outline-none"
      :class="label ? 'rounded-r-sm' : 'rounded-sm'"
      :disabled="disabled"
    >
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  name: string,
  placeholder?: string
  label?: string
  disabled?: boolean
}>()
</script>

<style scoped>

</style>
