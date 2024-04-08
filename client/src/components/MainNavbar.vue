<template>
  <nav v-auto-animate class="absolute top-0 left-0 flex flex-col w-full md:w-auto md:h-full bg-primary border-b md:border-r border-neutral-800">
    <div
      class="flex p-3"
    >
      <button id="mainnavbar-toggle" type="button" class="flex text-2xl" @click.prevent="toggleCollapsed()">
        <NuxtIcon name="menu-hamburguer" />
      </button>
    </div>
    <div v-if="!collapsed" class="flex flex-col p-3 text-secondary-dark">
      Items
    </div>
  </nav>
</template>

<script setup lang="ts">
const collapsed = ref(true)

const toggleCollapsed = (value?: boolean) => {
  collapsed.value = value ?? !collapsed.value
}
</script>

<style scoped>

</style>
