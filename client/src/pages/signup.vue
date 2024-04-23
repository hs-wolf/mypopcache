<template>
  <div class="flex flex-col gap-3 p-3">
    <h1>Sign up</h1>
    <form v-if="!success" class="flex flex-col gap-2" @submit.prevent="handleRegister">
      <input v-model="email" :disabled="loading" class="text-primary-light" type="email" placeholder="Email">
      <input v-model="password" :disabled="loading" class="text-primary-light" type="password" placeholder="Password">
      <input
        type="submit"
        :value="loading ? 'Loading' : 'Sign up'"
        :disabled="loading"
      >
      <span v-if="errorMsg" class="text-sm text-danger-light">{{ errorMsg }}</span>
    </form>
    <p v-else>
      Signed up successfully!
    </p>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const success = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  try {
    loading.value = true
    success.value = false
    errorMsg.value = ''
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (error) {
      throw error
    }
    success.value = true
  } catch (error) {
    errorMsg.value = (error as Error).message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
