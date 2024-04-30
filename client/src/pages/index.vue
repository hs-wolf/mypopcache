<template>
  <div class="flex flex-col p-3">
    <h1>Home</h1>
    <span>{{ user }}</span>
  </div>
</template>

<script setup lang="ts">
const user = useAuth.user()
</script>

<style scoped>

</style>
