<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-2xl">
      Hello (with tailwind styles)
    </h1>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        Image Optimizer
      </p>
      <!-- <NuxtImg
        src="/spaghetti.jpg"
        width="256"
        height="128"
        loading="lazy"
        :ismap="true"
        decoding="auto"
        class="w-[50%] object-cover"
      /> -->
      <img
        src="/spaghetti.jpg"
        width="256"
        height="128"
        class="w-[50%] object-cover"
      >
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Animated List
      </p>
      <button id="organize" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="organizeList">
        Oraganize List
      </button>
      <ul v-auto-animate class="flex flex-col">
        <li v-for="item in list" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <p class="font-semibold">
        VueUse Composable
      </p>
      <div class="flex gap-2">
        <p>Mouse X {{ x }}</p>
        <p>Mouse Y {{ y }}</p>
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Localization: {{ $t('key') }} | {{ $t('nested.value') }}
      </p>
      <button id="english" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="switchLanguage('en')">
        {{ $t('english') }}
      </button>
      <button id="portuguese" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="switchLanguage('pt')">
        {{ $t('portuguese') }}
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        SVG Icons & Color Mode
      </p>
      <div class="flex gap-2 text-2xl">
        <button id="dark" type="button" @click.prevent="changeColorMode('dark')">
          <NuxtIcon name="moon" />
        </button>
        <button id="light" type="button" @click.prevent="changeColorMode('light')">
          <NuxtIcon name="sun" />
        </button>
        <button id="system" type="button" @click.prevent="changeColorMode('system')">
          <NuxtIcon name="screen" />
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        Form Validation
      </p>
      <form class="flex flex-col items-start gap-2" @submit="onSubmit">
        <input v-model="email" name="email" type="email" class="border border-black">
        <span class="text-sm text-red-500">{{ errors.email }}</span>
        <input v-model="password" name="password" type="password" class="border border-black">
        <span class="text-sm text-red-500">{{ errors.password }}</span>
        <button id="submit" type="submit" class="px-2 py-1 bg-gray-400">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const alertsStore = useAlertsStore()
const { x, y } = useMouse()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()

const list = ref(['Apple', 'Banana', 'Grape', 'Orange'])
const listOrder = ref(0)

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, 'This is required').email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, 'This is required').min(8, { message: 'Too short' })
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

function organizeList () {
  list.value.sort((a, b) => {
    if (a < b) {
      return listOrder.value === 0 ? -1 : 1
    }
    if (a > b) {
      return listOrder.value === 0 ? 1 : -1
    }
    return 0
  })
  listOrder.value = listOrder.value === 0 ? 1 : 0
}

function switchLanguage (locale: string) {
  navigateTo(switchLocalePath(locale))
}

function changeColorMode (value: 'dark' | 'light' | 'system') {
  colorMode.preference = value
}

onMounted(() => {
  alertsStore.handlerError(new Error('Testing Error'))
})
</script>

<style scoped>

</style>
