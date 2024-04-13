<template>
  <nav
    ref="rootRef"
    v-auto-animate
    class="absolute top-0 left-0 flex flex-col w-full max-h-full md:h-full bg-primary border-b md:border-r border-primary-light overflow-auto"
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
      <div class="flex flex-col gap-3 text-lg">
        <NuxtLink
          v-for="page in pages"
          :key="page"
          :to="localePath({ name: page })"
          active-class="text-secondary font-semibold"
          @click.prevent="navigationAction"
        >
          {{ $t(`components.main-navbar.pages.${page}`) }}
        </NuxtLink>
      </div>
      <hr class="border-primary-light">
      <MainNavbarLocales />
      <hr class="border-primary-light">
      <MainNavbarAuth />
    </div>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const collapsed = ref(true)
const rootRef = ref<HTMLElement | null>(null)
const pages = ref(['index', 'cache', 'profile', 'settings'])

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
