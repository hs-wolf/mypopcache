<template>
  <div class="flex flex-col p-3">
    Waiting for login...
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    // Redirect to protected page
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<style scoped>

</style>
