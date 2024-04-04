import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    root: fileURLToPath(new URL('./', import.meta.url)),
    outputFile: '',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.vue']
    }
  }
})
