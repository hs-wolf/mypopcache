<template>
  <div class="flex items-center w-full">
    <label v-if="label" :for="`select-${name}`" class="px-3 py-2 bg-secondary-dark rounded-l-sm text-primary-light">{{ label }}</label>
    <select
      :id="`select-${name}`"
      v-model="model"
      class="w-full h-9 lg:h-10 px-3 py-2 bg-secondary text-primary leading-none outline-none disabled:opacity-50"
      :class="label ? 'rounded-r-sm' : 'rounded-sm'"
      :disabled="disabled"
    >
      <option v-for="option in options" :key="option.name" :value="option.name">
        {{ $t(option.label) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  name: string,
  options: {
    name: string,
    label: string
  }[]
  placeholder?: string
  label?: string
  disabled?: boolean
}>()
</script>

<style scoped>

</style>
