<template>
  <nav
    ref="rootRef"
    v-auto-animate
    class="absolute top-0 left-0 flex flex-col w-full md:h-full bg-primary border-b md:border-r border-neutral-800"
    :class="collapsed ? 'md:w-auto' : 'md:w-32'"
  >
    <div
      class="flex p-3"
    >
      <button id="mainnavbar-toggle" type="button" class="flex" @click.prevent="toggleCollapsed()">
        <NuxtIcon name="menu-hamburguer" class="text-2xl transition-transform" :class="{ 'rotate-90': !collapsed }" />
      </button>
    </div>
    <div v-if="!collapsed" class="flex flex-col px-3 pb-1.5 text-secondary-dark">
      <NuxtLink
        v-for="page in pages"
        :key="page.name"
        :to="localePath({ name: page.name })"
        class="py-1.5"
        active-class="text-secondary font-semibold"
        @click.prevent="navigationAction"
      >
        {{ page.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const collapsed = ref(true)
const rootRef = ref<HTMLElement | null>(null)
const pages = ref([
  {
    name: 'index',
    label: 'Home'
  },
  {
    name: 'cache',
    label: 'Cache'
  },
  {
    name: 'profile',
    label: 'Profile'
  },
  {
    name: 'settings',
    label: 'Settings'
  }
])

const isHovering = useElementHover(rootRef)

const toggleCollapsed = (value?: boolean) => {
  collapsed.value = value ?? !collapsed.value
}

const navigationAction = () => {
  toggleCollapsed(true)
}

onClickOutside(rootRef, () => {
  toggleCollapsed(true)
})

watch(isHovering, () => {
  isHovering.value ? toggleCollapsed(false) : toggleCollapsed(true)
})
</script>

<style scoped>

</style>
