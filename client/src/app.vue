<template>
  <div v-if="loaded" class="fixed inset-0 flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div v-else class="fixed inset-0 flex flex-col">
    <BaseLoading />
  </div>
</template>

<script setup lang="ts">
const loaded = useAuth.loaded()
</script>

<style scoped>

</style>
