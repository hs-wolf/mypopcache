<template>
  <div v-auto-animate class="fixed inset-0 flex flex-col">
    <NuxtLayout v-if="loaded">
      <NuxtPage />
    </NuxtLayout>
    <BaseLoading v-else />
  </div>
</template>

<script setup lang="ts">
const loaded = useAuth.loaded()
</script>

<style scoped>

</style>
