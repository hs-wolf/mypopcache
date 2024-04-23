<template>
  <div class="flex flex-col gap-3">
    <div v-if="clientUser" class="flex flex-col gap-2">
      <div class="flex items-start justify-between gap-2">
        <button>
          <img
            src="https://avatarfiles.alphacoders.com/114/114007.jpg"
            alt="Username"
            width="48"
            height="48"
            class="rounded-sm"
          >
        </button>
        <div class="flex items-center gap-2">
          <BaseButton icon="share" theme="accent" :action="share" />
          <BaseButton icon="logout" theme="danger" :action="logout" />
        </div>
      </div>
      <h1 class="text-lg text-secondary font-semibold">
        {{ clientUser?.email }}
      </h1>
    </div>
    <div v-else class="flex flex-col gap-3">
      <BaseButton label="Login" theme="accent" :action="login" />
      <BaseButton label="Sign Up" theme="action" :action="signup" />
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const client = useSupabaseClient()
const clientUser = useSupabaseUser()

const share = () => {}

const logout = () => {
  client.auth.signOut()
}

const login = () => {
  navigateTo(localePath('/login'))
}

const signup = () => {
  navigateTo(localePath('/signup'))
}
</script>

<style scoped>

</style>
