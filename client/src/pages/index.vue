<template>
  <div class="flex flex-col p-3">
    <h1>Home</h1>
    <span>{{ usersStore.authUser }}</span>
  </div>
</template>

<script setup lang="ts">
const usersStore = useUsersStore()
</script>

<style scoped>

</style>
