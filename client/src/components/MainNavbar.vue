<template>
  <nav
    ref="rootRef"
    v-auto-animate
    class="absolute top-0 left-0 flex flex-col w-full md:h-full bg-primary border-b md:border-r border-primary-light"
    :class="collapsed ? 'md:w-auto' : 'md:w-64'"
  >
    <div
      class="flex p-3"
    >
      <button id="mainnavbar-toggle" type="button" class="flex" @click.prevent="toggleCollapsed()">
        <NuxtIcon name="menu-hamburguer" class="text-2xl transition-transform" :class="{ 'rotate-90': !collapsed }" />
      </button>
    </div>
    <div v-if="!collapsed" class="flex flex-col gap-3 p-3 text-secondary-dark">
      <div class="flex flex-col gap-3">
        <NuxtLink
          v-for="page in pages"
          :key="page.name"
          :to="localePath({ name: page.name })"
          active-class="text-secondary font-semibold"
          @click.prevent="navigationAction"
        >
          {{ page.label }}
        </NuxtLink>
      </div>
      <hr class="border-primary-light">
      <LanguageSelector />
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
  if (screen.width >= 768) {
    // isHovering.value ? toggleCollapsed(false) : toggleCollapsed(true)
  }
})
</script>

<style scoped>

</style>
