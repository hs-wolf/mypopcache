<template>
  <div class="flex flex-col gap-3">
    <h1>{{ $t('components.main-navbar.locales.language') }}</h1>
    <div v-auto-animate class="flex flex-col bg-primary-light rounded-sm">
      <button id="toggle-collapsed" type="button" class="flex justify-between items-center gap-2 px-3 py-2 text-sm lg:text-base text-secondary font-semibold" @click.prevent="toggleCollapsed()">
        <div class="flex items-center gap-2">
          <NuxtIcon :name="`flags/${$i18n.locale}`" class="text-xl" filled />
          <span>{{ $t(`locales.${$i18n.locale}`) }}</span>
        </div>
        <NuxtIcon name="chevron-down" class="text-xl transition-transform" :class="{ 'rotate-180': !collapsed }" />
      </button>
      <div v-if="!collapsed" class="flex flex-col gap-2 pb-2">
        <button
          v-for="language in Object.values(SupportedLocales)"
          :key="language"
          :value="language"
          class="flex items-center gap-2 px-3"
          :class="{ 'hidden': $i18n.locale === language }"
          @click.prevent="changeLanguage(language)"
        >
          <NuxtIcon :name="`flags/${language}`" class="text-xl" filled />
          <span>{{ $t(`locales.${language}`) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SupportedLocales } from '~/utils/constants'

const localesStore = useLocalesStore()

const collapsed = ref(true)

const toggleCollapsed = (value?: boolean) => {
  collapsed.value = value ?? !collapsed.value
}

function changeLanguage (value: SupportedLocales) {
  localesStore.changeLocale(value)
  toggleCollapsed(true)
}
</script>

<style scoped>

</style>
