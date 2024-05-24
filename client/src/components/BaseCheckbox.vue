<template>
  <div class="flex items-center gap-1 lg:gap-3">
    <input
      :id="`checkbox-${name}`"
      v-model="model"
      type="checkbox"
      :disabled="disabled"
      class="w-5 h-5 lg:w-6 lg:h-6"
    >
    <label v-if="label" :for="`checkbox-${name}`">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()

defineProps<{
  name: string,
  label?: string
  disabled?: boolean
}>()
</script>

<style scoped>

</style>
