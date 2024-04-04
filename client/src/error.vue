<script setup lang="ts">
defineProps<{error: Record<string, any>}>()

function handleError () {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <h1>{{ error?.message }}</h1>
    <button @click="handleError">
      Clear error
    </button>
  </div>
</template>
