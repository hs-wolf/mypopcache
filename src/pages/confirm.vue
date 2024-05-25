<template>
  <div class="flex flex-col p-3">
    Waiting for Sign in...
  </div>
</template>

<script setup lang="ts">

const localePath = useLocalePath()
const user = useAuth.user()

definePageMeta({ middleware: ['offline'] })

watch(user, () => {
  if (user.value) {
    return navigateTo(localePath('/'), { replace: true })
  }
}, { immediate: true })
</script>

<style scoped>

</style>
