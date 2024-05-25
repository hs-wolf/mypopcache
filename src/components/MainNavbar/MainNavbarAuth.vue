<template>
  <div class="flex flex-col gap-3 h-full">
    <div v-if="clientUser" class="flex flex-col gap-2 h-full">
      <img
        src="https://avatarfiles.alphacoders.com/114/114007.jpg"
        alt="Username"
        width="48"
        height="48"
        class="rounded-sm"
      >
      <h1 class="text-lg text-secondary font-semibold">
        {{ clientUser?.email }}
      </h1>
      <div class="flex items-center gap-2 self-end lg:self-start mt-auto">
        <!-- <BaseButton
          icon="share"
          theme="accent"
          @action="share"
        /> -->
        <BaseButton
          label="Logout"
          icon="logout"
          theme="danger"
          @action="logout"
        />
      </div>
    </div>
    <div v-else class="flex flex-col gap-3">
      <BaseButton
        label="Sign In"
        theme="accent"
        @action="signin"
      />
      <BaseButton
        label="Sign Up"
        theme="action"
        @action="signup"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{(e: 'action'): void }>()

const localePath = useLocalePath()
const client = useSupabaseClient()
const clientUser = useSupabaseUser()

// const share = () => {
//   emits('action')
// }

const logout = () => {
  client.auth.signOut()
  emits('action')
}

const signin = () => {
  navigateTo(localePath('/signin'))
  emits('action')
}

const signup = () => {
  navigateTo(localePath('/signup'))
  emits('action')
}
</script>

<style scoped>

</style>
