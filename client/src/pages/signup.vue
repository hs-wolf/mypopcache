<template>
  <div class="flex flex-col gap-3 p-3">
    <h1>Sign up</h1>
    <form v-if="!state.success" class="flex flex-col gap-2" @submit.prevent="handleRegister">
      <input v-model="state.email" :disabled="state.loading" class="text-primary-light" type="email" placeholder="Email">
      <input v-model="state.password" :disabled="state.loading" class="text-primary-light" type="password" placeholder="Password">
      <input
        type="submit"
        :value="state.loading ? 'Loading' : 'Sign up'"
        :disabled="state.loading"
      >
      <span v-if="state.errorMsg" class="text-sm text-danger-light">{{ state.errorMsg }}</span>
    </form>
    <p v-else>
      Signed up successfully!
    </p>
    {{ state }}
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const alertsStore = useAlertsStore()

const state = reactive({
  email: '',
  password: '',
  errorMsg: '',
  success: false,
  loading: false
})

const handleRegister = async () => {
  state.success = false
  state.loading = true
  state.errorMsg = ''
  const { error } = await client.auth.signUp({
    email: state.email,
    password: state.password
  })
  state.loading = false
  if (error) {
    return alertsStore.handlerError(error)
  }
  state.success = true
}
</script>

<style scoped>

</style>
