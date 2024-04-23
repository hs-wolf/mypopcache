<template>
  <div class="flex flex-col gap-3 p-3">
    <h1>Profile</h1>
    <p>{{ clientUser }}</p>
  </div>
</template>

<script setup lang="ts">
const clientUser = useSupabaseUser()
</script>

<style scoped>

</style>
