import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import HelloWorld from '~/components/HelloWorld.vue'

describe('Component Hello World', () => {
  it('Render Properly', async () => {
    await renderSuspended(HelloWorld)
    expect(screen.getByText('Hello (with tailwind styles)')).toBeDefined()
  })
})
