<template>
  <div class="flex flex-col p-3">
    Login
    <form class="row flex-center flex" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header">
          Supabase + Nuxt 3
        </h1>
        <p class="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input v-model="email" class="inputField" type="email" placeholder="Your email">
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) { throw error }
    alert('Check your email for the login link!')
  } catch (error) {
    alert((error as any).error_description || (error as any).message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
