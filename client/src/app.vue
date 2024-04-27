<template>
  <div class="fixed inset-0 flex flex-col">
    <BaseLoading v-if="state.loading" />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const usersStore = useUsersStore()
const localePath = useLocalePath()

const state = reactive({
  loading: true
})

onMounted(() => {
  client.auth.onAuthStateChange((_, session) => {
    state.loading = true
    usersStore.setAuthUser(session?.user)
    if (session && session.user) {
      navigateTo(localePath('/cache'))
    } else {
      usersStore.reset()
      navigateTo(localePath('/'))
    }
    state.loading = false
  })
})
</script>

<style scoped>

</style>
